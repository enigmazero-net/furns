import {
    collections as fallbackCollections,
    collectionEdges as fallbackCollectionEdges,
    getProductByHandle as getFallbackProductByHandle,
    getProducts as getFallbackProducts,
} from "@data/catalog";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://178.105.114.143/api";
const placeholderImage = "/images/logo/logo.png";

const edge = (node) => ({node});

const slugify = (value = "") => value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const escapeHtml = (value = "") => value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const normalizeArray = (data) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.items)) return data.items;
    if (Array.isArray(data?.data)) return data.data;
    if (Array.isArray(data?.results)) return data.results;
    return [];
};

export const apiFetch = async (path, options = {}) => {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers: {
            Accept: "application/json",
            ...(options.body ? {"Content-Type": "application/json"} : {}),
            ...(options.headers || {}),
        },
    });

    const text = await response.text();
    let data = null;

    try {
        data = text ? JSON.parse(text) : null;
    } catch {
        data = null;
    }

    if (!response.ok) {
        throw new Error(data?.detail || data?.message || text || `API request failed: ${response.status}`);
    }

    return data;
};

export const authApiFetch = (path, token, options = {}) => apiFetch(path, {
    ...options,
    headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${token}`,
    },
});

const findFallbackCollection = ({name, slug}) => fallbackCollections.find((collection) => (
    collection.handle === slug ||
    slugify(collection.title) === slug ||
    collection.title.toLowerCase() === String(name || "").toLowerCase()
));

export const normalizeCategory = (category = {}) => {
    const handle = category.slug || slugify(category.name || category.title);
    const fallback = findFallbackCollection({name: category.name || category.title, slug: handle});

    return {
        id: category.id || fallback?.id || `collection-${handle}`,
        title: category.name || category.title || fallback?.title || handle,
        handle,
        description: category.description || fallback?.description || "",
        image: fallback?.image || (category.image_url ? {
            id: category.image_url,
            originalSrc: category.image_url,
        } : null),
    };
};

const normalizeProductCategory = (name) => normalizeCategory({
    name,
    slug: slugify(name),
});

export const normalizeProduct = (product = {}) => {
    const handle = product.slug || product.handle || slugify(product.name || product.title);
    const fallback = getFallbackProductByHandle(handle);
    const category = product.category
        ? normalizeProductCategory(product.category)
        : fallback?.collections?.edges?.[0]?.node;
    const imageUrl = product.image_url || product.imageUrl || fallback?.images?.edges?.[0]?.node?.originalSrc || placeholderImage;
    const price = Number(product.price ?? fallback?.variants?.edges?.[0]?.node?.priceV2?.amount ?? 0);
    const compareAtPrice = Number(product.compare_at_price ?? product.compareAtPrice ?? fallback?.variants?.edges?.[0]?.node?.compareAtPriceV2?.amount ?? 0);
    const stock = Number(product.stock_quantity ?? product.stockQuantity ?? fallback?.variants?.edges?.[0]?.node?.quantityAvailable ?? 0);
    const title = product.name || product.title || fallback?.title || handle;
    const description = product.description || fallback?.description || "";
    const variantId = product.sku || fallback?.variants?.edges?.[0]?.node?.id || `variant-${handle}`;

    return {
        id: product.id || fallback?.id || `product-${handle}`,
        title,
        handle,
        description,
        descriptionHtml: product.description_html || fallback?.descriptionHtml || `<p>${escapeHtml(description)}</p>`,
        tags: Array.isArray(product.tags) ? product.tags : (fallback?.tags || [category?.handle].filter(Boolean)),
        images: {
            edges: [edge({
                id: imageUrl,
                originalSrc: imageUrl,
            })],
        },
        variants: {
            edges: [edge({
                id: variantId,
                title: fallback?.variants?.edges?.[0]?.node?.title || "Standard",
                sku: product.sku || fallback?.variants?.edges?.[0]?.node?.sku || variantId,
                quantityAvailable: stock,
                priceV2: {amount: String(price)},
                compareAtPriceV2: compareAtPrice > price ? {amount: String(compareAtPrice)} : null,
                selectedOptions: fallback?.variants?.edges?.[0]?.node?.selectedOptions || [],
            })],
        },
        options: fallback?.options || [{
            id: `option-${handle}`,
            name: "Finish",
            values: ["standard"],
        }],
        collections: {
            edges: category ? [edge(category)] : [],
        },
        currency: product.currency || "USD",
    };
};

const sortProductEdges = (productEdges, sort) => {
    if (!sort) return productEdges;

    const [key, direction] = sort.split("-");
    return [...productEdges].sort((a, b) => {
        if (key === "price") {
            const aPrice = Number(a.node.variants.edges[0].node.priceV2.amount);
            const bPrice = Number(b.node.variants.edges[0].node.priceV2.amount);
            return direction === "descending" ? bPrice - aPrice : aPrice - bPrice;
        }

        if (key === "title") {
            return direction === "descending"
                ? b.node.title.localeCompare(a.node.title)
                : a.node.title.localeCompare(b.node.title);
        }

        return 0;
    });
};

const filterProductEdges = (productEdges, search) => {
    const normalizedSearch = search?.toLowerCase();
    if (!normalizedSearch) return productEdges;

    return productEdges.filter(({node: product}) => (
        [product.title, product.description, ...(product.tags || [])]
            .join(" ")
            .toLowerCase()
            .includes(normalizedSearch)
    ));
};

export const fetchCategories = async () => {
    try {
        const categories = normalizeArray(await apiFetch("/categories"));
        return categories.map((category) => edge(normalizeCategory(category)));
    } catch {
        return fallbackCollectionEdges;
    }
};

export const fetchProducts = async ({sort, search, limit} = {}) => {
    try {
        const products = normalizeArray(await apiFetch("/products")).map((product) => edge(normalizeProduct(product)));
        const filtered = filterProductEdges(products, search);
        const sorted = sortProductEdges(filtered, sort);
        return sorted.slice(0, limit || sorted.length);
    } catch {
        return getFallbackProducts({sort, search, limit});
    }
};

export const fetchProductBySlug = async (slug) => {
    try {
        return normalizeProduct(await apiFetch(`/products/slug/${encodeURIComponent(slug)}`));
    } catch {
        return getFallbackProductByHandle(slug);
    }
};

export const fetchProductById = async (id) => {
    try {
        return normalizeProduct(await apiFetch(`/products/${encodeURIComponent(id)}`));
    } catch {
        return null;
    }
};

export const fetchCollection = async (slug, {sort} = {}) => {
    const [categories, products] = await Promise.all([
        fetchCategories(),
        fetchProducts({sort}),
    ]);
    const collection = categories.find(({node}) => node.handle === slug)?.node;
    const normalizedSlug = slugify(slug);
    const filteredProducts = products.filter(({node: product}) => (
        product.collections.edges.some(({node: item}) => item?.handle === normalizedSlug)
    ));

    return {
        title: collection?.title || slug,
        products: filteredProducts,
    };
};

export const addCartItem = (token, product) => authApiFetch("/cart/items", token, {
    method: "POST",
    body: JSON.stringify({
        product_id: product.id,
        quantity: product.quantity || 1,
        variant_id: product.variations?.id,
    }),
});

export const getCart = (token) => authApiFetch("/cart", token);

export const createCheckout = (token, payload) => authApiFetch("/checkout", token, {
    method: "POST",
    body: JSON.stringify(payload),
});

export const createPayment = (token, payload) => authApiFetch("/payments/create", token, {
    method: "POST",
    body: JSON.stringify(payload),
});

export const getOrders = (token) => authApiFetch("/orders", token);
export const getAdminOrders = (token) => authApiFetch("/admin/orders", token);
export const getAdminPayments = (token) => authApiFetch("/admin/payments", token);
export const getAdminAuditLogs = (token) => authApiFetch("/admin/audit-logs", token);

export const updateAdminOrderStatus = (token, id, status) => authApiFetch(`/admin/orders/${encodeURIComponent(id)}/status`, token, {
    method: "PATCH",
    body: JSON.stringify({status}),
});

export const updateAdminProductStock = (token, id, stockQuantity) => authApiFetch(`/admin/products/${encodeURIComponent(id)}/stock`, token, {
    method: "PATCH",
    body: JSON.stringify({stock_quantity: Number(stockQuantity)}),
});

export const normalizeOrder = (order = {}) => {
    const items = normalizeArray(order.items || order.order_items).map((item) => ({
        name: item.name || item.product_name || item.product?.name || "Product",
        quantity: Number(item.quantity || 1),
        price: Number(item.price || item.unit_price || item.product?.price || 0),
    }));

    return {
        id: order.id || order.order_id || order.reference || "Order",
        date: String(order.date || order.created_at || order.createdAt || "").slice(0, 10),
        total: Number(order.total || order.total_amount || order.amount || items.reduce((sum, item) => sum + item.price * item.quantity, 0)),
        status: order.status || order.order_status || "Pending",
        paymentStatus: order.paymentStatus || order.payment_status || order.payment?.status || "Pending",
        notificationStatus: order.notificationStatus || order.notification_status || "Pending",
        gatewayReference: order.gatewayReference || order.gateway_reference || order.payment?.reference || "Pending",
        customer: order.customer || order.customer_name || order.user?.name || "Customer",
        email: order.email || order.user?.email || "",
        shippingAddress: order.shippingAddress || order.shipping_address || order.address || "",
        items,
    };
};

export const normalizePayment = (payment = {}) => ({
    id: payment.id || payment.payment_id || payment.reference || "Payment",
    orderId: payment.order_id || payment.orderId || payment.order?.id || "",
    status: payment.status || "Pending",
    amount: Number(payment.amount || payment.total || 0),
    currency: payment.currency || "USD",
    gatewayReference: payment.gateway_reference || payment.gatewayReference || payment.reference || "",
    createdAt: payment.created_at || payment.createdAt || "",
});

export const normalizeAuditEvent = (event = {}) => ({
    time: event.time || event.created_at || event.createdAt || "",
    actor: event.actor || event.service || event.user || "",
    action: event.action || event.event || event.type || "",
    target: event.target || event.entity || event.resource || "",
    result: event.result || event.message || event.status || "",
});

export const normalizeAdminProduct = (product = {}) => {
    const normalized = product.node ? product.node : normalizeProduct(product);
    const price = Number(normalized.variants.edges[0].node.priceV2.amount);
    const stock = Number(normalized.variants.edges[0].node.quantityAvailable);

    return {
        id: normalized.id,
        name: normalized.title,
        category: normalized.collections.edges[0]?.node?.title || "Uncategorized",
        price,
        stock,
        status: stock > 0 ? "Active" : "Out of stock",
    };
};

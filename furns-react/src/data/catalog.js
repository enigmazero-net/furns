const image = (src) => ({
    id: src,
    originalSrc: src,
});

const edge = (node) => ({node});

const variant = (id, title, amount, compareAtAmount, quantityAvailable, selectedOptions = []) => edge({
    id,
    title,
    sku: id.toUpperCase(),
    quantityAvailable,
    priceV2: {amount: String(amount)},
    compareAtPriceV2: compareAtAmount ? {amount: String(compareAtAmount)} : null,
    selectedOptions,
});

export const collections = [
    {
        id: "collection-living",
        title: "Living Room",
        handle: "living",
        image: image("/images/banner/1.jpg"),
    },
    {
        id: "collection-bedroom",
        title: "Bedroom",
        handle: "bedroom",
        image: image("/images/banner/2.jpg"),
    },
    {
        id: "collection-office",
        title: "Office",
        handle: "office-chair",
        image: image("/images/about/01.jpg"),
    },
    {
        id: "collection-dining",
        title: "Dining",
        handle: "dining",
        image: image("/images/about/02.jpg"),
    },
    {
        id: "collection-lounge",
        title: "Lounge",
        handle: "lounge",
        image: image("/images/slider-image/slider-2-1.jpg"),
    },
];

const collectionEdge = (handle) => {
    const collection = collections.find((item) => item.handle === handle);
    return collection ? edge(collection) : null;
};

export const products = [
    {
        id: "product-aurora-sofa",
        title: "Aurora Fabric Sofa",
        handle: "aurora-fabric-sofa",
        description: "A comfortable three-seat sofa with soft woven fabric, tapered legs, and deep cushions for relaxed living rooms.",
        descriptionHtml: "<p>A comfortable three-seat sofa with soft woven fabric, tapered legs, and deep cushions for relaxed living rooms.</p>",
        tags: ["featured", "living"],
        images: {edges: [edge(image("/images/slider-image/slider-1.png")), edge(image("/images/banner/1.jpg"))]},
        variants: {edges: [variant("variant-aurora-charcoal", "Charcoal", 899, 1099, 12)]},
        options: [{id: "option-aurora-color", name: "Color", values: ["charcoal"]}],
        collections: {edges: [collectionEdge("living")]},
    },
    {
        id: "product-harbor-bed",
        title: "Harbor Platform Bed",
        handle: "harbor-platform-bed",
        description: "A low-profile bed frame with a padded headboard and solid timber slats for everyday durability.",
        descriptionHtml: "<p>A low-profile bed frame with a padded headboard and solid timber slats for everyday durability.</p>",
        tags: ["featured", "bedroom"],
        images: {edges: [edge(image("/images/slider-image/slider-2.png")), edge(image("/images/banner/2.jpg"))]},
        variants: {edges: [variant("variant-harbor-queen", "Queen", 749, 899, 8)]},
        options: [{id: "option-harbor-size", name: "Size", values: ["queen"]}],
        collections: {edges: [collectionEdge("bedroom")]},
    },
    {
        id: "product-nord-desk",
        title: "Nord Writing Desk",
        handle: "nord-writing-desk",
        description: "A compact writing desk with a warm wood finish, cable opening, and two slim drawers.",
        descriptionHtml: "<p>A compact writing desk with a warm wood finish, cable opening, and two slim drawers.</p>",
        tags: ["tending", "office"],
        images: {edges: [edge(image("/images/about/01.jpg")), edge(image("/images/slider-image/slider-2-1.jpg"))]},
        variants: {edges: [variant("variant-nord-oak", "Oak", 329, null, 15)]},
        options: [{id: "option-nord-finish", name: "Finish", values: ["oak"]}],
        collections: {edges: [collectionEdge("office-chair")]},
    },
    {
        id: "product-cedar-dining",
        title: "Cedar Dining Table",
        handle: "cedar-dining-table",
        description: "A six-seat dining table with a clean rectangular top and sturdy angled legs.",
        descriptionHtml: "<p>A six-seat dining table with a clean rectangular top and sturdy angled legs.</p>",
        tags: ["featured", "dining"],
        images: {edges: [edge(image("/images/about/02.jpg")), edge(image("/images/banner/2.jpg"))]},
        variants: {edges: [variant("variant-cedar-natural", "Natural", 649, 799, 6)]},
        options: [{id: "option-cedar-finish", name: "Finish", values: ["natural"]}],
        collections: {edges: [collectionEdge("dining")]},
    },
    {
        id: "product-luna-lounge-chair",
        title: "Luna Lounge Chair",
        handle: "luna-lounge-chair",
        description: "An accent chair with a curved back, generous seat, and textured upholstery.",
        descriptionHtml: "<p>An accent chair with a curved back, generous seat, and textured upholstery.</p>",
        tags: ["tending", "lounge"],
        images: {edges: [edge(image("/images/slider-image/slider-2-2.jpg")), edge(image("/images/banner/1.jpg"))]},
        variants: {edges: [variant("variant-luna-sand", "Sand", 299, 379, 10)]},
        options: [{id: "option-luna-color", name: "Color", values: ["sand"]}],
        collections: {edges: [collectionEdge("lounge"), collectionEdge("living")]},
    },
    {
        id: "product-metro-storage",
        title: "Metro Storage Cabinet",
        handle: "metro-storage-cabinet",
        description: "A versatile cabinet with adjustable shelves for dining rooms, entries, or home offices.",
        descriptionHtml: "<p>A versatile cabinet with adjustable shelves for dining rooms, entries, or home offices.</p>",
        tags: ["sale", "living"],
        images: {edges: [edge(image("/images/banner/1.jpg")), edge(image("/images/about/01.jpg"))]},
        variants: {edges: [variant("variant-metro-walnut", "Walnut", 419, 549, 9)]},
        options: [{id: "option-metro-finish", name: "Finish", values: ["walnut"]}],
        collections: {edges: [collectionEdge("living"), collectionEdge("dining")]},
    },
];

export const posts = [
    {
        id: "post-small-space",
        title: "How to Furnish a Small Living Room",
        handle: "furnish-small-living-room",
        excerpt: "Simple layout choices that make compact rooms feel comfortable and useful.",
        contentHtml: "<p>Start with a clear walking path, choose furniture with visible legs, and use storage pieces that work harder than one-purpose tables.</p>",
        image: image("/images/banner/1.jpg"),
        authorV2: {name: "Furns Team"},
        publishedAt: "2026-01-15T00:00:00.000Z",
        tags: ["Living Room", "Planning"],
    },
    {
        id: "post-bedroom",
        title: "Bedroom Furniture That Keeps Mornings Simple",
        handle: "bedroom-furniture-mornings",
        excerpt: "A practical mix of storage, lighting, and surfaces for calmer bedrooms.",
        contentHtml: "<p>Pair a comfortable bed with accessible bedside storage, a dresser that fits your routine, and lighting that supports both reading and winding down.</p>",
        image: image("/images/banner/2.jpg"),
        authorV2: {name: "Furns Team"},
        publishedAt: "2026-02-05T00:00:00.000Z",
        tags: ["Bedroom", "Storage"],
    },
    {
        id: "post-office",
        title: "Choosing a Better Home Office Desk",
        handle: "better-home-office-desk",
        excerpt: "What to measure before buying a desk for focused work at home.",
        contentHtml: "<p>Measure your chair clearance, monitor depth, and the position of nearby outlets before choosing the final desk size.</p>",
        image: image("/images/about/01.jpg"),
        authorV2: {name: "Furns Team"},
        publishedAt: "2026-03-10T00:00:00.000Z",
        tags: ["Office", "Buying Guide"],
    },
];

export const productEdges = products.map(edge);
export const collectionEdges = collections.map(edge);
export const postEdges = posts.map(edge);

export const getProductByHandle = (handle) => products.find((product) => product.handle === handle);

export const getPostByHandle = (handle) => posts.find((post) => post.handle === handle);

export const getCollectionByHandle = (handle) => {
    const collection = collections.find((item) => item.handle === handle);
    if (!collection) return null;
    return {
        ...collection,
        products: products
            .filter((product) => product.collections.edges.some(({node}) => node?.handle === handle))
            .map(edge),
    };
};

export const getProducts = ({sort, search, limit} = {}) => {
    const normalizedSearch = search?.toLowerCase();
    let result = products.filter((product) => {
        if (!normalizedSearch) return true;
        return [product.title, product.description, ...product.tags]
            .join(" ")
            .toLowerCase()
            .includes(normalizedSearch);
    });

    if (sort) {
        const [key, direction] = sort.split("-");
        result = [...result].sort((a, b) => {
            if (key === "price") {
                const aPrice = Number(a.variants.edges[0].node.priceV2.amount);
                const bPrice = Number(b.variants.edges[0].node.priceV2.amount);
                return direction === "descending" ? bPrice - aPrice : aPrice - bPrice;
            }

            if (key === "title") {
                return direction === "descending"
                    ? b.title.localeCompare(a.title)
                    : a.title.localeCompare(b.title);
            }

            return 0;
        });
    }

    return result.slice(0, limit || result.length).map(edge);
};

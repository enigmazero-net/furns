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
        image: image("/images/furniture/couch_2.jpeg"),
    },
    {
        id: "collection-bedroom",
        title: "Bedroom",
        handle: "bedroom",
        image: image("/images/furniture/bed_1.jpeg"),
    },
    {
        id: "collection-chairs",
        title: "Chairs",
        handle: "chairs",
        image: image("/images/furniture/chair_3.jpeg"),
    },
    {
        id: "collection-laundry",
        title: "Laundry",
        handle: "laundry",
        image: image("/images/furniture/laundry_3.jpeg"),
    },
    {
        id: "collection-shoe-storage",
        title: "Shoe Storage",
        handle: "shoe-storage",
        image: image("/images/furniture/shoe_1.jpeg"),
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
        images: {edges: [edge(image("/images/furniture/couch_2.jpeg")), edge(image("/images/furniture/couch_3.jpeg"))]},
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
        images: {edges: [edge(image("/images/furniture/bed_1.jpeg")), edge(image("/images/furniture/bed_2.jpeg"))]},
        variants: {edges: [variant("variant-harbor-queen", "Queen", 749, 899, 8)]},
        options: [{id: "option-harbor-size", name: "Size", values: ["queen"]}],
        collections: {edges: [collectionEdge("bedroom")]},
    },
    {
        id: "product-nova-accent-chair",
        title: "Nova Accent Chair",
        handle: "nova-accent-chair",
        description: "A sculpted accent chair with a soft blue seat, curved back, and slim tapered legs.",
        descriptionHtml: "<p>A sculpted accent chair with a soft blue seat, curved back, and slim tapered legs.</p>",
        tags: ["tending", "chairs"],
        images: {edges: [edge(image("/images/furniture/chair_3.jpeg")), edge(image("/images/furniture/chair_2.jpeg"))]},
        variants: {edges: [variant("variant-nova-blue", "Blue", 329, null, 15)]},
        options: [{id: "option-nova-color", name: "Color", values: ["blue"]}],
        collections: {edges: [collectionEdge("chairs")]},
    },
    {
        id: "product-woven-laundry-hamper",
        title: "Woven Laundry Hamper",
        handle: "woven-laundry-hamper",
        description: "A textured laundry basket with a generous woven body for towels, linens, and daily wash loads.",
        descriptionHtml: "<p>A textured laundry basket with a generous woven body for towels, linens, and daily wash loads.</p>",
        tags: ["featured", "laundry"],
        images: {edges: [edge(image("/images/furniture/laundry_3.jpeg")), edge(image("/images/furniture/laundry_2.jpeg")), edge(image("/images/furniture/laundry_1.jpeg"))]},
        variants: {edges: [variant("variant-hamper-natural", "Natural", 149, 199, 18)]},
        options: [{id: "option-hamper-finish", name: "Finish", values: ["natural"]}],
        collections: {edges: [collectionEdge("laundry")]},
    },
    {
        id: "product-luna-lounge-chair",
        title: "Luna Lounge Chair",
        handle: "luna-lounge-chair",
        description: "An accent chair with a curved back, generous seat, and textured upholstery.",
        descriptionHtml: "<p>An accent chair with a curved back, generous seat, and textured upholstery.</p>",
        tags: ["tending", "chairs"],
        images: {edges: [edge(image("/images/furniture/chair_2.jpeg")), edge(image("/images/furniture/chair_1.jpeg"))]},
        variants: {edges: [variant("variant-luna-sand", "Sand", 299, 379, 10)]},
        options: [{id: "option-luna-color", name: "Color", values: ["sand"]}],
        collections: {edges: [collectionEdge("chairs"), collectionEdge("living")]},
    },
    {
        id: "product-entryway-shoe-rack",
        title: "Entryway Shoe Rack",
        handle: "entryway-shoe-rack",
        description: "A compact open rack that keeps everyday shoes organized near the entryway.",
        descriptionHtml: "<p>A compact open rack that keeps everyday shoes organized near the entryway.</p>",
        tags: ["sale", "shoe-storage"],
        images: {edges: [edge(image("/images/furniture/shoe_1.jpeg")), edge(image("/images/furniture/shoe_2.jpeg"))]},
        variants: {edges: [variant("variant-shoe-rack-oak", "Oak", 219, 279, 9)]},
        options: [{id: "option-shoe-rack-finish", name: "Finish", values: ["oak"]}],
        collections: {edges: [collectionEdge("shoe-storage")]},
    },
];

export const posts = [
    {
        id: "post-small-space",
        title: "How to Furnish a Small Living Room",
        handle: "furnish-small-living-room",
        excerpt: "Simple layout choices that make compact rooms feel comfortable and useful.",
        contentHtml: "<p>Start with a clear walking path, choose furniture with visible legs, and use storage pieces that work harder than one-purpose tables.</p>",
        image: image("/images/furniture/couch_1.jpeg"),
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
        image: image("/images/furniture/bed_3.jpeg"),
        authorV2: {name: "Furns Team"},
        publishedAt: "2026-02-05T00:00:00.000Z",
        tags: ["Bedroom", "Storage"],
    },
    {
        id: "post-entry-storage",
        title: "Entry Storage That Keeps Floors Clear",
        handle: "entry-storage-that-keeps-floors-clear",
        excerpt: "Simple shoe and laundry storage choices for cleaner daily routines.",
        contentHtml: "<p>Choose open shoe racks for grab-and-go pairs, closed baskets for visual calm, and slim storage where the entryway needs to stay walkable.</p>",
        image: image("/images/furniture/shoe_3.jpeg"),
        authorV2: {name: "Furns Team"},
        publishedAt: "2026-03-10T00:00:00.000Z",
        tags: ["Storage", "Buying Guide"],
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

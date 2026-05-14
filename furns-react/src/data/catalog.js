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
        id: "collection-dining",
        title: "Dining",
        handle: "dining",
        image: image("/images/furniture/dinning_table_1.jpeg"),
    },
    {
        id: "collection-office",
        title: "Office",
        handle: "office",
        image: image("/images/furniture/computer_desk_1.jpeg"),
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
    {
        id: "collection-service",
        title: "Service Trolleys",
        handle: "service-trolleys",
        image: image("/images/furniture/service-trolley_3.jpeg"),
    },
];

const collectionEdge = (handle) => {
    const collection = collections.find((item) => item.handle === handle);
    return collection ? edge(collection) : null;
};

const product = ({
    id,
    title,
    description,
    imageSrc,
    price,
    compareAtPrice = null,
    stock = 10,
    tags = [],
    collections: collectionHandles = [],
    optionName = "Finish",
    optionValue = "Standard",
}) => ({
    id: `product-${id}`,
    title,
    handle: id,
    description,
    descriptionHtml: `<p>${description}</p>`,
    tags,
    images: {edges: [edge(image(imageSrc))]},
    variants: {edges: [variant(`variant-${id}`, optionValue, price, compareAtPrice, stock)]},
    options: [{id: `option-${id}`, name: optionName, values: [optionValue.toLowerCase()]}],
    collections: {edges: collectionHandles.map(collectionEdge).filter(Boolean)},
});

export const products = [
    product({id: "aurora-fabric-sofa", title: "Aurora Fabric Sofa", description: "A comfortable three-seat sofa with soft woven fabric and deep cushions for relaxed living rooms.", imageSrc: "/images/furniture/couch_1.jpeg", price: 899, compareAtPrice: 1099, stock: 12, tags: ["featured", "sale", "living"], collections: ["living"], optionName: "Color", optionValue: "Silver"}),
    product({id: "navy-lounge-sofa", title: "Navy Lounge Sofa", description: "A low modern sofa with rich upholstery and a polished living room profile.", imageSrc: "/images/furniture/couch_2.jpeg", price: 949, stock: 9, tags: ["living"], collections: ["living"], optionName: "Color", optionValue: "Navy"}),
    product({id: "blue-velvet-sofa", title: "Blue Velvet Sofa", description: "A statement sofa with tapered legs, velvet texture, and a compact lounge footprint.", imageSrc: "/images/furniture/couch_3.jpeg", price: 829, stock: 7, tags: ["living"], collections: ["living"], optionName: "Color", optionValue: "Blue"}),

    product({id: "harbor-platform-bed", title: "Harbor Platform Bed", description: "A low-profile bed frame with a padded headboard and solid timber slats for everyday durability.", imageSrc: "/images/furniture/bed_1.jpeg", price: 749, stock: 8, tags: ["featured", "bedroom"], collections: ["bedroom"], optionName: "Size", optionValue: "Queen"}),
    product({id: "calm-storage-bed", title: "Calm Storage Bed", description: "A bright bedroom setup with a soft upholstered headboard and practical surrounding storage.", imageSrc: "/images/furniture/bed_2.jpeg", price: 799, compareAtPrice: 899, stock: 6, tags: ["sale", "bedroom"], collections: ["bedroom"], optionName: "Size", optionValue: "Queen"}),
    product({id: "oak-headboard-bed", title: "Oak Headboard Bed", description: "A relaxed bed frame with a natural timber headboard and warm minimal styling.", imageSrc: "/images/furniture/bed_3.jpeg", price: 699, stock: 10, tags: ["bedroom"], collections: ["bedroom"], optionName: "Size", optionValue: "Queen"}),

    product({id: "vintage-cafe-chair", title: "Vintage Cafe Chair", description: "A lightweight cafe chair with curved metalwork and a distinctive painted finish.", imageSrc: "/images/furniture/chair_1.jpeg", price: 189, stock: 16, tags: ["chairs"], collections: ["chairs"], optionName: "Color", optionValue: "Teal"}),
    product({id: "blue-work-chair", title: "Blue Work Chair", description: "A compact upholstered chair with a swivel base for bright workspaces.", imageSrc: "/images/furniture/chair_2.jpeg", price: 249, stock: 13, tags: ["tending", "chairs"], collections: ["chairs"], optionName: "Color", optionValue: "Blue"}),
    product({id: "nova-accent-chair", title: "Nova Accent Chair", description: "A sculpted accent chair with a soft blue seat, curved back, and slim tapered legs.", imageSrc: "/images/furniture/chair_3.jpeg", price: 329, stock: 15, tags: ["featured", "chairs"], collections: ["chairs"], optionName: "Color", optionValue: "Blue"}),

    product({id: "woven-laundry-hamper", title: "Woven Laundry Hamper", description: "A textured laundry basket with a generous woven body for towels, linens, and daily wash loads.", imageSrc: "/images/furniture/laundry_1.jpeg", price: 129, stock: 18, tags: ["laundry"], collections: ["laundry"], optionName: "Finish", optionValue: "Blue"}),
    product({id: "covered-laundry-basket", title: "Covered Laundry Basket", description: "A tall laundry basket with a fitted lid and room for everyday towels and linens.", imageSrc: "/images/furniture/laundry_2.jpeg", price: 149, stock: 14, tags: ["featured", "laundry"], collections: ["laundry"], optionName: "Finish", optionValue: "Beige"}),
    product({id: "woven-clothes-basket", title: "Woven Clothes Basket", description: "A natural woven basket with open storage for laundry rooms and utility spaces.", imageSrc: "/images/furniture/laundry_3.jpeg", price: 159, stock: 12, tags: ["laundry"], collections: ["laundry"], optionName: "Finish", optionValue: "Natural"}),

    product({id: "camden-dining-table", title: "Camden Dining Table", description: "A clean dining table with a warm timber finish and practical proportions for everyday meals.", imageSrc: "/images/furniture/dinning_table_1.jpeg", price: 679, stock: 7, tags: ["featured", "dining"], collections: ["dining"], optionName: "Finish", optionValue: "Natural"}),
    product({id: "urban-dining-table", title: "Urban Dining Table", description: "A compact dining set with a darker finish and a grounded everyday dining feel.", imageSrc: "/images/furniture/dinning_table_2.jpeg", price: 729, compareAtPrice: 829, stock: 5, tags: ["sale", "dining"], collections: ["dining"], optionName: "Finish", optionValue: "Walnut"}),
    product({id: "family-dining-table", title: "Family Dining Table", description: "A full dining arrangement with room for shared meals and casual hosting.", imageSrc: "/images/furniture/dinning_table_3.jpeg", price: 849, stock: 6, tags: ["dining"], collections: ["dining"], optionName: "Finish", optionValue: "Oak"}),

    product({id: "axis-computer-desk", title: "Axis Computer Desk", description: "A compact computer desk with a focused work surface, storage space, and a clean home-office profile.", imageSrc: "/images/furniture/computer_desk_1.jpeg", price: 389, stock: 11, tags: ["featured", "office"], collections: ["office"], optionName: "Finish", optionValue: "Walnut"}),
    product({id: "nord-computer-desk", title: "Nord Computer Desk", description: "A light computer desk with practical shelving and a tidy work-from-home footprint.", imageSrc: "/images/furniture/computer_desk_2.jpeg", price: 429, stock: 9, tags: ["office"], collections: ["office"], optionName: "Finish", optionValue: "White"}),
    product({id: "studio-computer-desk", title: "Studio Computer Desk", description: "A slim computer desk designed for small offices, study corners, and daily laptop use.", imageSrc: "/images/furniture/computer_desk_3.jpeg", price: 359, stock: 10, tags: ["office"], collections: ["office"], optionName: "Finish", optionValue: "Oak"}),

    product({id: "entryway-shoe-bench", title: "Entryway Shoe Bench", description: "A wood shoe bench that keeps daily footwear organized near the entryway.", imageSrc: "/images/furniture/shoe_1.jpeg", price: 219, stock: 9, tags: ["shoe-storage"], collections: ["shoe-storage"], optionName: "Finish", optionValue: "Oak"}),
    product({id: "white-shoe-rack", title: "White Shoe Rack", description: "A clean open shoe rack with two shelves for compact entry and closet storage.", imageSrc: "/images/furniture/shoe_2.jpeg", price: 179, stock: 11, tags: ["shoe-storage"], collections: ["shoe-storage"], optionName: "Finish", optionValue: "White"}),
    product({id: "slim-shoe-shelf", title: "Slim Shoe Shelf", description: "A slim black shoe shelf with open tiers and a simple modern profile.", imageSrc: "/images/furniture/shoe_3.jpeg", price: 199, stock: 12, tags: ["featured", "shoe-storage"], collections: ["shoe-storage"], optionName: "Finish", optionValue: "Black"}),

    product({id: "folding-service-trolley", title: "Folding Service Trolley", description: "A compact service trolley with a folding frame for flexible home and dining support.", imageSrc: "/images/furniture/service-trolley_1.jpeg", price: 169, stock: 14, tags: ["service-trolleys"], collections: ["service-trolleys"], optionName: "Color", optionValue: "White"}),
    product({id: "wood-service-trolley", title: "Wood Service Trolley", description: "A warm rolling trolley with open shelves for dining rooms, kitchens, and service areas.", imageSrc: "/images/furniture/service-trolley_2.jpeg", price: 229, compareAtPrice: 279, stock: 8, tags: ["sale", "service-trolleys"], collections: ["service-trolleys"], optionName: "Finish", optionValue: "Natural"}),
    product({id: "utility-service-trolley", title: "Utility Service Trolley", description: "A practical multi-tier service trolley for mobile storage and everyday utility work.", imageSrc: "/images/furniture/service-trolley_3.jpeg", price: 189, stock: 10, tags: ["service-trolleys", "storage"], collections: ["service-trolleys"], optionName: "Color", optionValue: "Black"}),
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

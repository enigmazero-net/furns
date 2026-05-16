export const serviceFlows = {
    auth: ["02 Frontend -> Authentication Service", "06 Authentication Service -> User Database"],
    catalog: ["03 Frontend -> Product Catalog Service", "07 Product Catalog Service -> Product Catalog Database"],
    cart: ["04 Frontend -> Cart Service", "08 Cart Service -> Cart Store"],
    checkout: [
        "05 Frontend -> Checkout Service",
        "09 Checkout Service -> Order Management Service",
        "12 Checkout Service -> Payment Processing Service",
    ],
    payment: [
        "13 Payment Processing Service -> Third-Party Gateway",
        "14 Third-Party Gateway -> Payment Processing Service",
        "15 Payment Processing Service -> Order Management Service",
        "10 Payment Processing Service -> Payment Transaction Store",
    ],
    order: [
        "23 Order Management Service -> Order Database",
        "24 Frontend -> Order Management Service",
    ],
    notification: [
        "16 Order Management Service -> Notification Service",
        "17 Notification Service -> External Notification Provider",
        "25 External Notification Provider -> Client / User",
    ],
    admin: [
        "18 Admin User -> Admin Management Service",
        "19 Admin Management Service -> Audit Log Store",
        "20 Admin Management Service -> Order Database",
        "21 Admin Management Service -> Product Catalog Database",
    ],
    audit: [
        "11 Order Management Service -> Audit Log Store",
        "19 Admin Management Service -> Audit Log Store",
        "22 System Services -> Audit Log Store",
    ],
};

export const mockUser = {
    name: "Furns Customer",
    email: "customer@furns.local",
    role: "Customer",
};

export const mockOrders = [
    {
        id: "ORD-1007",
        date: "2026-05-14",
        total: 1328,
        status: "Payment Authorized",
        paymentStatus: "Authorized",
        notificationStatus: "Confirmation email queued",
        gatewayReference: "AQM-TXN-90071",
        customer: "Furns Customer",
        email: "customer@furns.local",
        shippingAddress: "42 Workshop Lane, Colombo",
        items: [
            {name: "Aurora Fabric Sofa", quantity: 1, price: 899},
            {name: "Studio Computer Desk", quantity: 1, price: 359},
            {name: "Mock delivery", quantity: 1, price: 70},
        ],
    },
    {
        id: "ORD-1006",
        date: "2026-05-13",
        total: 408,
        status: "Pending Payment",
        paymentStatus: "Awaiting gateway response",
        notificationStatus: "Not sent",
        gatewayReference: "Pending",
        customer: "Furns Customer",
        email: "customer@furns.local",
        shippingAddress: "42 Workshop Lane, Colombo",
        items: [
            {name: "Vintage Cafe Chair", quantity: 2, price: 189},
            {name: "Mock delivery", quantity: 1, price: 30},
        ],
    },
    {
        id: "ORD-1005",
        date: "2026-05-12",
        total: 229,
        status: "Payment Failed",
        paymentStatus: "Declined by mock gateway",
        notificationStatus: "Failure email sent",
        gatewayReference: "AQM-TXN-90058",
        customer: "Furns Customer",
        email: "customer@furns.local",
        shippingAddress: "42 Workshop Lane, Colombo",
        items: [
            {name: "Wood Service Trolley", quantity: 1, price: 229},
        ],
    },
];

export const adminProducts = [
    {id: "product-aurora-fabric-sofa", name: "Aurora Fabric Sofa", category: "Living Room", price: 899, stock: 12, status: "Active"},
    {id: "product-harbor-platform-bed", name: "Harbor Platform Bed", category: "Bedroom", price: 749, stock: 8, status: "Active"},
    {id: "product-axis-computer-desk", name: "Axis Computer Desk", category: "Office", price: 389, stock: 11, status: "Active"},
    {id: "product-wood-service-trolley", name: "Wood Service Trolley", category: "Service Trolleys", price: 229, stock: 8, status: "Low stock"},
];

export const auditEvents = [
    {time: "2026-05-14 10:42", actor: "Order Management Service", action: "ORDER_CREATED", target: "ORD-1007", result: "Stored in Order Database"},
    {time: "2026-05-14 10:43", actor: "Payment Processing Service", action: "PAYMENT_AUTHORIZED", target: "AQM-TXN-90071", result: "Transaction stored"},
    {time: "2026-05-14 10:44", actor: "Notification Service", action: "CONFIRMATION_QUEUED", target: "ORD-1007", result: "Mock provider accepted"},
    {time: "2026-05-14 10:49", actor: "Admin Management Service", action: "ORDER_STATUS_UPDATED", target: "ORD-1006", result: "Audit event written"},
    {time: "2026-05-14 11:02", actor: "System Services", action: "SECURITY_EVENT", target: "admin@furns.local", result: "Admin login checked"},
];

export const getMockOrder = (id) => mockOrders.find((order) => order.id === id) || mockOrders[0];


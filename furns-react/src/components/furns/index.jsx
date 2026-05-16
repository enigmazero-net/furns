import Link from "next/link";
import {
    FlowList,
    FlowNumber,
    FurnsPanel,
    FurnsTable,
    FurnsTableWrap,
    MetricCard,
    MetricGrid,
    MetricLabel,
    MetricValue,
    PanelTitle,
    StatusPill,
} from "@components/furns/furns.style";

export const statusVariant = (status = "") => {
    const value = status.toLowerCase();
    if (value.includes("failed") || value.includes("declined") || value.includes("cancel")) return "danger";
    if (value.includes("pending") || value.includes("awaiting") || value.includes("low")) return "warning";
    return "success";
};

export const ServiceFlow = ({title = "Diagram Coverage", flows = []}) => (
    <FurnsPanel>
        <PanelTitle>{title}</PanelTitle>
        <FlowList>
            {flows.map((flow) => {
                const [number, ...labelParts] = flow.split(" ");
                const label = labelParts.join(" ");
                return (
                    <li key={flow}>
                        <FlowNumber>{number}</FlowNumber>
                        <span>{label}</span>
                    </li>
                );
            })}
        </FlowList>
    </FurnsPanel>
);

export const Metrics = ({items}) => (
    <MetricGrid>
        {items.map((item) => (
            <MetricCard key={item.label}>
                <MetricLabel>{item.label}</MetricLabel>
                <MetricValue>{item.value}</MetricValue>
            </MetricCard>
        ))}
    </MetricGrid>
);

export const OrdersTable = ({orders, admin = false}) => (
    <FurnsTableWrap>
        <FurnsTable>
            <thead>
                <tr>
                    <th>Order</th>
                    <th>Date</th>
                    {admin && <th>Customer</th>}
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Total</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order) => (
                    <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.date}</td>
                        {admin && <td>{order.customer}</td>}
                        <td>{order.paymentStatus}</td>
                        <td><StatusPill variant={statusVariant(order.status)}>{order.status}</StatusPill></td>
                        <td>${order.total.toFixed(2)}</td>
                        <td>
                            <Link href={admin ? `/admin/orders/${order.id}` : `/account/orders/${order.id}`}>
                                <a>View</a>
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </FurnsTable>
    </FurnsTableWrap>
);

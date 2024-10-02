namespace MyShop.Models;

public class OrderItem {
    public int OrderItemId { get; set; }
    public int ItemId { get; set; }
    public virtual Item Item { get; set; } = default!;
    public int Quantity { get; set; }
    public int OrderId { get; set; }
    public virtual Order Order { get; set; } = default!;
    public decimal OrderItemPrice { get; set; }
}
namespace DefaultNamespace;

public class FilterValue
{
    public long Id { get; set; }
    public long ProductId { get; set; }
    public Product Product { get; set; }

    public long FilterId { get; set; }
    public Filter Filter { get; set; }

    public string Value { get; set; }

    public FilterValue() { }

    public FilterValue(long productId, long filterId, string value)
    {
        ProductId = productId;
        FilterId = filterId;
        Value = value;
    }
}
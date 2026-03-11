namespace DefaultNamespace;

public class Filter
{
    public long Id { get; set; }

    public string Name { get; set; }

    // значения фильтра для разных товаров
    public List<FilterValue> Values { get; set; } = new();

    public Filter() { }

    public Filter(string name)
    {
        Name = name;
    }
}
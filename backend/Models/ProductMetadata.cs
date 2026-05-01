namespace backend.Models
{
    public class ProductMetadata
    {
        public Dictionary<string, string> Attribute { get; set; } = new();
        public List<string> AboutItems { get; set; } = new();
    }
}

using System.Diagnostics.Contracts;
using System.Runtime.InteropServices.Marshalling;
using Amazon.S3.Model;

namespace backend.BLL.DTO;

public class FilterDTO
{
    public long Id { get; set; }

    public string Name { get; set; }
}

public class FilterCellDTO
{ 
    public string key { get; set; }
    public string title { get; set; }
    public string type { get; set; }
    public double min { get; set; }
    public double max { get; set; }
    public List<string>? options { get; set; }
}


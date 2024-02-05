using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace BookStoreApi.Models;

public class Book
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement("Name")]
    [JsonPropertyName("Name")]
    public string BookName { get; set; } = null!;

    [BsonElement("Price")]
    [JsonPropertyName("Price")]
    public decimal Price { get; set; }

    [BsonElement("Category")]
    [JsonPropertyName("Category")]
    public string Category { get; set; } = null!;

    [BsonElement("Author")]
    [JsonPropertyName("Author")]
    public string Author { get; set; } = null!;

    [BsonElement("IsAvailable")]
    [JsonPropertyName("IsAvailable")]
    public bool IsAvailable { get; set; }
}
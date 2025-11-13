namespace WebAPI.Entity
{
    public class Member
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public int Number { get; set; }
        public required string Phone { get; set; }
        public string? Address { get; set; }
        public DateTime RegistrationDate { get; set; }
        public bool IsActive { get; set; } = true;
    }
}

using WebAPI.Enums;

namespace WebAPI.Entity
{
    public class Payment
    {
        public Guid Id { get; set; }
        public Guid MemberId { get; set; }
        public decimal Amount { get; set; }
        public DateTime PaymentDate { get; set; }
        public Month Month { get; set; }
        public int Year { get; set; }
    }
}

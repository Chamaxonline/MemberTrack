using WebAPI.Enums;

namespace WebAPI.Model
{
    public class PaymentDTO
    {
        public int Id { get; set; }
        public int MemberId { get; set; }
        public decimal Amount { get; set; }
        public DateTime PaymentDate { get; set; }
        public Month Month { get; set; }
        public int Year { get; set; }

    }
}

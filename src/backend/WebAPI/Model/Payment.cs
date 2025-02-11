namespace WebAPI.Model
{
    public class Payment
    {
        public int Id { get; set; }
        public int MemberId { get; set; }
        public decimal Amount { get; set; }
        public DateTime PaymentDate { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }

    }
}

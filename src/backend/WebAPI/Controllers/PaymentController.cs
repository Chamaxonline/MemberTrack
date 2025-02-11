using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Model;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController(AppDbContext _context) : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult<Payment>> RecordPayment(Payment payment)
        {
            // Validate the payment
            if (payment.Amount <= 0)
            {
                return BadRequest("Payment amount must be greater than zero.");
            }

            //if (string.IsNullOrEmpty(payment.CashReceivedBy))
            //{
            //    return BadRequest("Cash received by field is required.");
            //}

            // Set the payment date to the current date and time
            payment.PaymentDate = DateTime.Now;

            // Find the member associated with the payment
            var member = await _context.Members.FindAsync(payment.MemberId);
            if (member == null)
            {
                return NotFound("Member not found");
            }

            // Update the member's last payment date and next due date
            //member.LastPaymentDate = payment.PaymentDate;
            //member.NextDueDate = payment.PaymentDate.AddMonths(1); // Set next due date to one month from now

            // Add the payment to the database
            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPayment), new { id = payment.Id }, payment);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Payment>> GetPayment(int id)
        {
            var payment = await _context.Payments.FindAsync(id);
            if (payment == null)
            {
                return NotFound();
            }
            return payment;
        }

        [HttpGet("member/{memberId}")]
        public async Task<ActionResult<IEnumerable<Payment>>> GetPaymentsByMember(int memberId)
        {
            var payments = await _context.Payments
                .Where(p => p.MemberId == memberId)
                .ToListAsync();
            return payments;
        }
    }

}

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using WebAPI.Model;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MemberController(AppDbContext _context) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Member>>> GetMembers()
        {
            return await _context.Members.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Member>> RegisterMember(Member member)
        {
            member.RegistrationDate = DateTime.Now;
            _context.Members.Add(member);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetMembers), new { id = member.Id }, member);
        }

        //[HttpGet("{id}/payments")]
        //public async Task<ActionResult<IEnumerable<Payment>>> GetMemberPayments(int id)
        //{
        //    var member = await _context.Members
        //        .Include(m => m.Payments) // Include the Payments navigation property
        //        .FirstOrDefaultAsync(m => m.MemberId == id);
        //    if (member == null)
        //    {
        //        return NotFound();
        //    }
        //    return Ok(member.Payments);
        //}
    }
}

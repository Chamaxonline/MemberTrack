using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using WebAPI.Model;
using WebAPI.Services;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MemberController(IMemberService service) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDTO>>> GetMembers()
        {
            return await service.GetAll();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<MemberDTO>> GetMember(Guid id)
        {
            var member = await service.GetById(id);
            if (member == null)
            {
                return NotFound();
            }
            return Ok(member);
        }

        [HttpPost]
        public async Task<ActionResult<MemberDTO>> RegisterMember(MemberDTO member)
        {
            return Ok(await service.Add(member));
        }

        [HttpGet("RegNumber")]
        public async Task<ActionResult<int>> GetNumber()
        {
            return Ok(await service.GetNextNumber());
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

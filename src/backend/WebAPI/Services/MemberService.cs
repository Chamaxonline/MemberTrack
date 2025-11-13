using Microsoft.EntityFrameworkCore;
using WebAPI.Entity;
using WebAPI.Model;

namespace WebAPI.Services;

public class MemberService(AppDbContext context) : IMemberService
{
    public async Task<Member> Add(MemberDTO dto)
    {
        var member = new Member
        {
            Name = dto.Name,
            Number = dto.RegNumber,
            Phone = dto.Phone,
            Address = dto.Address,
            RegistrationDate = dto.RegistrationDate
        };
        var result = context.Member.Add(member);
        await context.SaveChangesAsync();
        return result.Entity;
    }


    public async Task<MemberDTO?> GetById(Guid id)
    {
        var member = await context.Member.FirstOrDefaultAsync(x => x.Id == id);
        if (member == null) return null;
        var dto = new MemberDTO
        {
            Id = member.Id,
            Name = member.Name,
            RegNumber = member.Number,
            Phone = member.Phone,
            Address = member.Address,
            RegistrationDate = member.RegistrationDate
        };
        return dto;
    }
    public async Task<List<MemberDTO>> GetAll()
    {
        var members = await context.Member.OrderBy(x => x.Name).ToListAsync();
        var memberDTOs = new List<MemberDTO>();
        foreach (var member in members)
        {
            var dto = new MemberDTO
            {
                Id = member.Id,
                Name = member.Name,
                RegNumber = member.Number,
                Phone = member.Phone,
                Address = member.Address,
                RegistrationDate = member.RegistrationDate
            };
            memberDTOs.Add(dto);

        }
        return memberDTOs;
    }

    public async Task<int> GetNextNumber()
    {
        return await context.Member.CountAsync() + 1;
    }
}
using WebAPI.Entity;
using WebAPI.Model;

namespace WebAPI.Services
{
    public interface IMemberService
    {
        Task<Member> Add(MemberDTO dto);
        Task<MemberDTO?> GetById(Guid id);
        Task<List<MemberDTO>> GetAll();
        Task<int> GetNextNumber();
    }
}

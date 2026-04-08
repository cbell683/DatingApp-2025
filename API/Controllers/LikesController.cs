using API.Entities;
using API.Interfaces;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;
using API.Helpers;

namespace API.Controllers;

public class LikesController : BaseApiController
{
    private readonly ILikesRepository _likesRepository;

    public LikesController(ILikesRepository likesRepository)
    {
        _likesRepository = likesRepository;
    }

    [HttpPost("{targetMemberId}")]
    public async Task<ActionResult> AddLike(string targetMemberId)
    {
        var sourceMemberId = User.GetUserId();

        var existingLike = await _likesRepository.GetMemberLike(sourceMemberId, targetMemberId);
        if (existingLike != null)
            return BadRequest("You already like this member");

        var like = new MemberLike
        {
            SourceMemberId = sourceMemberId,
            TargetMemberId = targetMemberId
        };

        _likesRepository.AddLike(like);

        if (await _likesRepository.SaveAllChanges())
            return Ok();

        return BadRequest("Failed to like member");
    }

    [HttpDelete("{targetMemberId}")]
    public async Task<ActionResult> DeleteLike(string targetMemberId)
    {
        var sourceMemberId = User.GetUserId();

        var like = await _likesRepository.GetMemberLike(sourceMemberId, targetMemberId);
        if (like == null)
            return NotFound();

        _likesRepository.DeleteLike(like);

        if (await _likesRepository.SaveAllChanges())
            return Ok();

        return BadRequest("Failed to remove like");
    }

    [HttpGet("ids")]
    public async Task<ActionResult<IReadOnlyCollection<string>>> GetCurrentMemberLikeIds()
    {
        var memberId = User.GetUserId();
        var ids = await _likesRepository.GetCurrentMemberLikeIds(memberId);
        return Ok(ids);
    }

    [HttpGet]
    public async Task<ActionResult<PaginatedResult<Member>>> GetCurrentMemberLikes(
        [FromQuery] LikesParams likesParams)
    {
        likesParams.MemberId = User.GetMemberId();
        var members = await _likesRepository.GetMemberLikes(likesParams);

        return Ok(members);
    }
}

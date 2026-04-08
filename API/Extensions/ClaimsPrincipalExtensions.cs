using System.Security.Claims;

namespace API.Extensions;

public static class ClaimsPrincipalExtensions
{
    public static string GetUserId(this ClaimsPrincipal user)
    {
        return user.FindFirst(ClaimTypes.NameIdentifier)?.Value
               ?? throw new Exception("User ID claim missing");
    }

    public static string GetMemberId(this ClaimsPrincipal user)
    {
        return user.FindFirst(ClaimTypes.NameIdentifier)?.Value
               ?? throw new Exception("Member ID claim missing");
    }
}

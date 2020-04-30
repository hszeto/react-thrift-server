namespace java com.gimbal

// TODO: move to AuthenticationService.thrift
struct SessionId {
    1: required i64 lowBits
    2: required i64 highBits
}

// TODO: move to a thrift specification file defining commonly used core data types
// See https://pubs.opengroup.org/onlinepubs/9699919799/basedefs/V1_chap04.html#tag_04_16
typedef i64 SecondsSinceUnixEpoch
typedef string EmailAddress

// TODO: move to AdminAuthenticationService.thrift
typedef SessionId AdminSessionId

typedef SessionId UserSessionId

typedef string UserPassword
typedef string UserSessionCreationToken

struct UserProperties {
    1: required EmailAddress emailAddress
    2: optional SecondsSinceUnixEpoch passwordCreationTime
}

// TODO: move to AdminAuthorizationService.thrift
enum AdminRole {
    Role0
}

exception RateLimitExceeded {}
exception UnknownUserSessionCreationToken {}
exception AdminSessionNotActive {}
exception UserSessionNotActive {}
exception IncorrectPasswordOrUnknownEmailAddress {}
exception UserNotAssociatedWithEmailAddress {}

exception AdminRequiresRole {
    1: required AdminRole requiredRole
}

service UserAuthenticationService {

    UserSessionId createUserSessionFromAdminSession(
        1: required AdminSessionId adminSession
        2: required EmailAddress userEmailAddress
    ) throws (
        // 1: RateLimitExceeded rateLimitExceeded
        // 2: AdminSessionNotActive adminSessionNotActive
        // 3: AdminRequiresRole adminRequiresRole
        // 4: UserNotAssociatedWithEmailAddress userNotAssociatedWithEmailAddress
    )

    void sendUserSessionCreationTokenToUserEmailAddress(
        1: required EmailAddress userEmailAddress
    ) throws (
        // 1: RateLimitExceeded rateLimitExceeded
    )

    UserSessionId createUserSessionWithToken(
        1: required UserSessionCreationToken token
    ) throws (
        // 1: RateLimitExceeded rateLimitExceeded
        // 2: UnknownUserSessionCreationToken unknownUserSessionCreationToken
    )

    UserSessionId createUserSessionWithEmailAddressAndPassword(
        1: required EmailAddress emailAddress
        2: required UserPassword password
    ) throws (
        // 1: RateLimitExceeded rateLimitExceeded
        // 2: IncorrectPasswordOrUnknownEmailAddress incorrectPasswordOrUnknownEmailAddress
    )

    void terminateUserSession(
        1: required UserSessionId userSession
    ) throws (
        // 1: RateLimitExceeded rateLimitExceeded
        // 2: UserSessionNotActive userSessionNotActive
    )

    void setPasswordForSessionUser(
        1: required UserSessionId userSession
        2: required UserPassword password
    ) throws (
        // 1: RateLimitExceeded rateLimitExceeded
        // 2: UserSessionNotActive userSessionNotActive
    )

    UserProperties getPropertiesForSessionUser(
        1: required UserSessionId userSession
    ) throws (
        // 1: RateLimitExceeded rateLimitExceeded
        // 2: UserSessionNotActive userSessionNotActive
    )
}


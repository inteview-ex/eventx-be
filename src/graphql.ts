
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum AttachmentTypes {
    PHOTO = "PHOTO",
    VIDEO = "VIDEO",
    AUDIO = "AUDIO",
    LINK = "LINK"
}

export enum Locale {
    EN = "EN",
    ZH = "ZH"
}

export enum AuthType {
    EMAIL = "EMAIL",
    PHONE = "PHONE",
    EMAIL_PASSWORD = "EMAIL_PASSWORD",
    SSO = "SSO"
}

export enum SSOProvider {
    GOOGLE = "GOOGLE",
    NONE = "NONE"
}

export enum UserRole {
    ADMIN = "ADMIN",
    USER = "USER"
}

export enum UserStatus {
    INVITED = "INVITED",
    ACTIVE = "ACTIVE",
    DEACTIVE = "DEACTIVE"
}

export enum EventTokenTypes {
    OTP = "OTP",
    SOCIETY_INVITE_CODE = "SOCIETY_INVITE_CODE"
}

export enum EventTokenStatus {
    ACTIVE = "ACTIVE",
    USED = "USED",
    DEACTIVE = "DEACTIVE"
}

export enum EventParticipantStatus {
    PENDING = "PENDING",
    REJECTED = "REJECTED",
    ACCEPTED = "ACCEPTED",
    QUITED = "QUITED"
}

export enum CommonStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE"
}

export enum PaymentOptionType {
    CASH = "CASH",
    BANK = "BANK",
    GATEWAY = "GATEWAY"
}

export enum SocialLinkPlatform {
    FACEBOOK = "FACEBOOK",
    INSTAGRAM = "INSTAGRAM",
    OTHERS = "OTHERS"
}

export enum SocietyMemberStatus {
    INVITED = "INVITED",
    PENDING = "PENDING",
    ACTIVE = "ACTIVE",
    REJECTED = "REJECTED",
    INACTIVE = "INACTIVE"
}

export enum SocietyMemberRole {
    ADMIN = "ADMIN",
    COMMITTEE = "COMMITTEE",
    USER = "USER"
}

export enum SocietyMembershipPlanType {
    PERMANENT = "PERMANENT",
    YEAR = "YEAR",
    DEDICATED = "DEDICATED"
}

export enum SocietyMembershipStatus {
    INACTIVE = "INACTIVE",
    ACTIVE = "ACTIVE"
}

export enum SocietyType {
    SINGLE_UNIVERSITY = "SINGLE_UNIVERSITY",
    JOIN_UNIVERSITY = "JOIN_UNIVERSITY",
    PUBLIC = "PUBLIC"
}

export enum SocietyStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    PRE_PUBLISH = "PRE_PUBLISH"
}

export enum SchoolStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE"
}

export enum Country {
    DEFAULT = "DEFAULT",
    CHINA = "CHINA",
    HONG_KONG = "HONG_KONG",
    UNITED_OF_STATE = "UNITED_OF_STATE"
}

export enum SorterTypes {
    ASC = "ASC",
    DESC = "DESC"
}

export enum SocietyEventHostingType {
    ONLINE = "ONLINE",
    OFFLINE = "OFFLINE",
    TBC = "TBC"
}

export interface UserArrayFilterInput {
    userIDs?: Nullable<string[]>;
    email?: Nullable<string>;
    roles?: Nullable<UserRole[]>;
    statuses?: Nullable<UserStatus[]>;
    isEnableMFA?: Nullable<boolean>;
}

export interface UserFilterInput {
    userID?: Nullable<string>;
    authTypes?: Nullable<AuthType[]>;
    email?: Nullable<string>;
    countryCode?: Nullable<string>;
    phone?: Nullable<string>;
    ssoProvider?: Nullable<SSOProvider>;
    ssoUID?: Nullable<string>;
}

export interface UserProfileFilterInput {
    userIds?: Nullable<string[]>;
    darkMode?: Nullable<boolean>;
    language?: Nullable<Locale>;
}

export interface EventTokenArrayFilterInput {
    eventTokenIds?: Nullable<string[]>;
    tokenOwnerId?: Nullable<string>;
    event?: Nullable<EventTokenTypes[]>;
    status?: Nullable<EventTokenStatus[]>;
    expireFrom?: Nullable<DateTime>;
    expireTo?: Nullable<DateTime>;
    isValid?: Nullable<boolean>;
}

export interface SchoolFilterInput {
    pagination?: Nullable<PaginationInput>;
    schoolIds?: Nullable<string[]>;
    status?: Nullable<SchoolStatus>;
    countries?: Nullable<Country[]>;
}

export interface PaginationInput {
    offset?: Nullable<number>;
    page?: Nullable<number>;
    limit?: Nullable<number>;
}

export interface SocietyCategoryFilterInput {
    pagination?: Nullable<PaginationInput>;
    societyCategoryIds?: Nullable<string[]>;
    schoolIds?: Nullable<string[]>;
    statuses?: Nullable<CommonStatus[]>;
    isIncludeDefault?: Nullable<boolean>;
}

export interface SocietyFilterInput {
    pagination?: Nullable<PaginationInput>;
    societyIds?: Nullable<string[]>;
    schoolId?: Nullable<string>;
    schoolIds?: Nullable<string[]>;
    types?: Nullable<SocietyType[]>;
}

export interface SocietyMembershipFilterInput {
    pagination?: Nullable<PaginationInput>;
    societyMembershipIds?: Nullable<string[]>;
    societyId?: Nullable<string>;
    statuses?: Nullable<SocietyMembershipStatus[]>;
    planTypes?: Nullable<SocietyMembershipPlanType[]>;
}

export interface SocietyMemberFilterInput {
    pagination?: Nullable<PaginationInput>;
    societyMemberIds?: Nullable<string[]>;
    societyIds?: Nullable<string[]>;
    societyId?: Nullable<string>;
    userIds?: Nullable<string[]>;
    userId?: Nullable<string>;
    userEmail?: Nullable<string>;
    userEmails?: Nullable<string[]>;
    statuses?: Nullable<SocietyMemberStatus[]>;
    roles?: Nullable<SocietyMemberRole[]>;
}

export interface SocietyEventFilterInput {
    pagination?: Nullable<PaginationInput>;
    eventIds?: Nullable<string[]>;
    schoolIds?: Nullable<string[]>;
    schoolId?: Nullable<string>;
    societyId?: Nullable<string>;
    memberPrice?: Nullable<number>;
    nonMemberPrice?: Nullable<number>;
    societyIds?: Nullable<string[]>;
    freeAndSocietyIds?: Nullable<string[]>;
    isMemberOnly?: Nullable<boolean>;
    isHidden?: Nullable<boolean>;
    isInteracted?: Nullable<boolean>;
    needApproved?: Nullable<boolean>;
    sortByStartDate?: Nullable<SorterTypes>;
    startDateTo?: Nullable<DateTime>;
    startDateFrom?: Nullable<DateTime>;
    sortByEndDate?: Nullable<SorterTypes>;
    endDateTo?: Nullable<DateTime>;
    endDateFrom?: Nullable<DateTime>;
    hostingType?: Nullable<SocietyEventHostingType>;
}

export interface SocietyHighlightFilterInput {
    pagination?: Nullable<PaginationInput>;
    societyHighlightIds?: Nullable<string[]>;
    societyIds?: Nullable<string[]>;
    schoolIds?: Nullable<string[]>;
    fromDate?: Nullable<DateTime>;
    toDate?: Nullable<DateTime>;
    sortByCreateDate?: Nullable<SorterTypes>;
}

export interface SocietyPerkFilterInput {
    pagination?: Nullable<PaginationInput>;
    societyPerkIds?: Nullable<string[]>;
    societyId?: Nullable<string>;
}

export interface EventParticipantFilterInput {
    pagination?: Nullable<PaginationInput>;
    eventParticipantIDs?: Nullable<string[]>;
    userId?: Nullable<string>;
    userIds?: Nullable<string[]>;
    societyMemberId?: Nullable<string>;
    societyMemberIds?: Nullable<string[]>;
    societyEventId?: Nullable<string>;
    societyEventIds?: Nullable<string[]>;
    societyId?: Nullable<string>;
    societyIds?: Nullable<string[]>;
    eventParticipantStatus?: Nullable<EventParticipantStatus>;
    eventParticipantStatuses?: Nullable<EventParticipantStatus[]>;
}

export interface PaymentOptionFilterInput {
    pagination?: Nullable<PaginationInput>;
    paymentOptionIds?: Nullable<string[]>;
    societyIds?: Nullable<string[]>;
    societyId?: Nullable<string>;
    statuses?: Nullable<CommonStatus[]>;
    types?: Nullable<PaymentOptionType[]>;
}

export interface SMHighlightsFilterInput {
    pagination?: Nullable<PaginationInput>;
    isMySchoolOnly?: Nullable<boolean>;
    isMySocietysOnly?: Nullable<boolean>;
    sortByDate?: Nullable<SorterTypes>;
    fromTime?: Nullable<DateTime>;
    toTime?: Nullable<DateTime>;
}

export interface SMMyEventFilterInput {
    eventParticipantStatuses?: Nullable<EventParticipantStatus[]>;
    sortByStartDate?: Nullable<SorterTypes>;
    startDateTo?: Nullable<DateTime>;
    startDateFrom?: Nullable<DateTime>;
    sortByEndDate?: Nullable<SorterTypes>;
    endDateTo?: Nullable<DateTime>;
    endDateFrom?: Nullable<DateTime>;
    pagination?: Nullable<PaginationInput>;
}

export interface SMUpcomingEventsFilterInput {
    pagination?: Nullable<PaginationInput>;
    schoolId?: Nullable<string>;
    sortByDate?: Nullable<SorterTypes>;
    isMemberOnlyEvent?: Nullable<boolean>;
    isFree?: Nullable<boolean>;
    fromTime: DateTime;
    toTime?: Nullable<DateTime>;
}

export interface FirebaseUserRegisterInput {
    firebaseToken: string;
}

export interface FirebaseUserLoginInput {
    firebaseToken: string;
}

export interface LocalUserPreRegisterInput {
    authType: AuthType;
    email?: Nullable<string>;
    password?: Nullable<string>;
    countryCode?: Nullable<string>;
    phone?: Nullable<string>;
}

export interface LocalUserRegisterInput {
    authType: AuthType;
    email?: Nullable<string>;
    password?: Nullable<string>;
    countryCode?: Nullable<string>;
    phone?: Nullable<string>;
    authCode?: Nullable<string>;
}

export interface LocalUserPreLoginInput {
    authType: AuthType;
    email?: Nullable<string>;
    password?: Nullable<string>;
    countryCode?: Nullable<string>;
    phone?: Nullable<string>;
}

export interface LocalUserLoginInput {
    authType: AuthType;
    email?: Nullable<string>;
    password?: Nullable<string>;
    countryCode?: Nullable<string>;
    phone?: Nullable<string>;
    authCode?: Nullable<string>;
}

export interface MFAOTPCreateInput {
    email: string;
}

export interface UMUserCreateInput {
    authType: AuthType;
    ssoUID?: Nullable<string>;
    ssoProvider?: Nullable<SSOProvider>;
    email?: Nullable<string>;
    password?: Nullable<string>;
    countryCode?: Nullable<string>;
    phone?: Nullable<string>;
    roles: UserRole[];
    status: UserStatus;
    nickname?: Nullable<string>;
    photoURL?: Nullable<string>;
}

export interface UserUpdateInput {
    ssoUID?: Nullable<string>;
    ssoProvider?: Nullable<SSOProvider>;
    email?: Nullable<string>;
    password?: Nullable<string>;
    countryCode?: Nullable<string>;
    phone?: Nullable<string>;
    roles?: Nullable<UserRole[]>;
    status?: Nullable<UserStatus>;
    authTypes?: Nullable<AuthType[]>;
    userId: string;
}

export interface UserProfileUpdateInput {
    userId: string;
    nickname?: Nullable<string>;
    profilePic?: Nullable<PhotoAttachmentCreateInput>;
    isClearProfilePic?: Nullable<boolean>;
    darkMode?: Nullable<boolean>;
    language?: Nullable<Locale>;
    schoolId?: Nullable<string>;
    isInitUserProfile?: Nullable<boolean>;
}

export interface PhotoAttachmentCreateInput {
    attachmentFileType?: Nullable<AttachmentTypes>;
    size?: Nullable<number>;
    fileURL: string;
    fileName: string;
    filePath?: Nullable<string>;
    contentType?: Nullable<string>;
    originalFileName?: Nullable<string>;
}

export interface UMFirebaseEmailPasswordUserCreateInput {
    email: string;
    password: string;
    emailVerified?: Nullable<boolean>;
    roles: UserRole[];
    status: UserStatus;
}

export interface EventParticipantCreateInput {
    userId: string;
    societyMemberId?: Nullable<string>;
    societyEventId: string;
    societyId: string;
    remark?: Nullable<string>;
    eventParticipantStatus: EventParticipantStatus;
}

export interface EventParticipantUpdateInput {
    eventParticipantID: string;
    userId: string;
    societyMemberId?: Nullable<string>;
    societyEventId: string;
    societyId: string;
    remark?: Nullable<string>;
    eventParticipantStatus: EventParticipantStatus;
}

export interface SMApplyForSocietyMemberInput {
    societyId: string;
    societyMembershipId: string;
}

export interface SMAcceptSocietyMemberInvitationInput {
    isAccept: boolean;
    societyMemberId: string;
}

export interface SMEventParticipantInput {
    userId: string;
    societyEventId: string;
    remarkAns?: Nullable<string>;
}

export interface SMSocietyUpdateInput {
    name?: Nullable<string>;
    icon?: Nullable<PhotoAttachmentCreateInput>;
    backgroundImage?: Nullable<PhotoAttachmentCreateInput>;
    description?: Nullable<string>;
    categoryIds?: Nullable<string[]>;
    socialLinks?: Nullable<SocialLinkCreateInput[]>;
    societyId: string;
    isClearIcon?: Nullable<boolean>;
    isClearBackgroundImage?: Nullable<boolean>;
}

export interface SocialLinkCreateInput {
    type: SocialLinkPlatform;
    url: string;
}

export interface SMInviteNewMembersInput {
    roles: SocietyMemberRole[];
    emails: string[];
    societyMembershipId: string;
}

export interface SMPaymentOptionCreateInput {
    title: string;
    instruction: string;
    status?: Nullable<CommonStatus>;
    type: PaymentOptionType;
}

export interface PaymentOptionUpdateInput {
    title?: Nullable<string>;
    instruction?: Nullable<string>;
    status?: Nullable<CommonStatus>;
    paymentOptionId: string;
}

export interface SMSocietyMembershipCreateInput {
    title: string;
    description: string;
    status?: Nullable<SocietyMembershipStatus>;
    planType: SocietyMembershipPlanType;
    planYear?: Nullable<number>;
    planEndDate?: Nullable<DateTime>;
    price?: Nullable<string>;
}

export interface SocietyMembershipUpdateInput {
    societyId?: Nullable<string>;
    title?: Nullable<string>;
    description?: Nullable<string>;
    status?: Nullable<SocietyMembershipStatus>;
    planType?: Nullable<SocietyMembershipPlanType>;
    planYear?: Nullable<number>;
    planEndDate?: Nullable<DateTime>;
    price?: Nullable<string>;
    societyMembershipId: string;
}

export interface SMProcessSocietyMemberApplicationInput {
    societyMemberId: string;
    isAccept: boolean;
    reason?: Nullable<string>;
}

export interface SMSocietyEventCreateInput {
    title: string;
    startDate: DateTime;
    endDate: DateTime;
    hostingType: SocietyEventHostingType;
    description?: Nullable<string>;
    requiringRemark: boolean;
    remark?: Nullable<string>;
    hostDetail?: Nullable<string>;
    image?: Nullable<PhotoAttachmentCreateInput>;
    isMemberOnly: boolean;
    isHidden?: Nullable<boolean>;
    isInteracted?: Nullable<boolean>;
    needApproved: boolean;
    memberPrice: number;
    nonMemberPrice: number;
    maxParticipant: number;
}

export interface SocietyEventUpdateInput {
    eventId: string;
    title?: Nullable<string>;
    startDate?: Nullable<DateTime>;
    endDate?: Nullable<DateTime>;
    hostingType?: Nullable<SocietyEventHostingType>;
    hostDetail?: Nullable<string>;
    description?: Nullable<string>;
    requiringRemark?: Nullable<boolean>;
    remark?: Nullable<string>;
    image?: Nullable<PhotoAttachmentCreateInput>;
    isClearImage?: Nullable<boolean>;
    isMemberOnly?: Nullable<boolean>;
    isHidden?: Nullable<boolean>;
    isInteracted?: Nullable<boolean>;
    needApproved?: Nullable<boolean>;
    memberPrice?: Nullable<number>;
    nonMemberPrice?: Nullable<number>;
    maxParticipant?: Nullable<number>;
}

export interface SMSocietyHighlightCreateInput {
    eventId: string;
    medias?: Nullable<PhotoAttachmentCreateInput[]>;
}

export interface SocietyHighlightUpdateInput {
    societyHighlightId: string;
    medias?: Nullable<PhotoAttachmentCreateInput[]>;
    isClearMedias?: Nullable<boolean>;
}

export interface SMSocietyPerkCreateInput {
    store: string;
    description?: Nullable<string>;
    image?: Nullable<PhotoAttachmentCreateInput>;
}

export interface SocietyPerkUpdateInput {
    societyPerkId: string;
    store: string;
    description?: Nullable<string>;
    image?: Nullable<PhotoAttachmentCreateInput>;
    isClearImage?: Nullable<boolean>;
}

export interface SMEventAdminCheckParticipantInput {
    eventParticipantId: string;
    eventParticipantStatus: EventParticipantStatus;
}

export interface SocietyCategoryCreateInput {
    schoolId?: Nullable<string>;
    name: string;
    icon: PhotoAttachmentCreateInput;
    status?: Nullable<CommonStatus>;
}

export interface SocietyCategoryUpdateInput {
    name?: Nullable<string>;
    icon?: Nullable<PhotoAttachmentCreateInput>;
    status?: Nullable<CommonStatus>;
    societyCategoryId: string;
    isClearIcon?: Nullable<boolean>;
}

export interface SMSocietyAndAdminCreateInput {
    society: SocietyCreateInput;
    admin: SMSocietyAdminCreateInput;
}

export interface SocietyCreateInput {
    name: string;
    icon?: Nullable<PhotoAttachmentCreateInput>;
    backgroundImage?: Nullable<PhotoAttachmentCreateInput>;
    description?: Nullable<string>;
    schoolIds: string[];
    categoryIds: string[];
    type: SocietyType;
    status: SocietyStatus;
    socialLinks?: Nullable<SocialLinkCreateInput[]>;
}

export interface SMSocietyAdminCreateInput {
    authType: AuthType;
    email?: Nullable<string>;
    password?: Nullable<string>;
    countryCode?: Nullable<string>;
    phone?: Nullable<string>;
}

export interface SocietyUpdateInput {
    name?: Nullable<string>;
    icon?: Nullable<PhotoAttachmentCreateInput>;
    backgroundImage?: Nullable<PhotoAttachmentCreateInput>;
    description?: Nullable<string>;
    schoolIds?: Nullable<string[]>;
    categoryIds?: Nullable<string[]>;
    type?: Nullable<SocietyType>;
    status?: Nullable<SocietyStatus>;
    socialLinks?: Nullable<SocialLinkCreateInput[]>;
    societyId: string;
    isClearIcon?: Nullable<boolean>;
    isClearBackgroundImage?: Nullable<boolean>;
}

export interface SocietyMembershipCreateInput {
    societyId: string;
    title: string;
    description: string;
    status?: Nullable<SocietyMembershipStatus>;
    planType: SocietyMembershipPlanType;
    planYear?: Nullable<number>;
    planEndDate?: Nullable<DateTime>;
    price?: Nullable<string>;
}

export interface SocietyEventCreateInput {
    title: string;
    startDate: DateTime;
    endDate: DateTime;
    hostingType: SocietyEventHostingType;
    description?: Nullable<string>;
    requiringRemark: boolean;
    remark?: Nullable<string>;
    hostDetail?: Nullable<string>;
    image?: Nullable<PhotoAttachmentCreateInput>;
    isMemberOnly: boolean;
    isHidden?: Nullable<boolean>;
    isInteracted?: Nullable<boolean>;
    needApproved: boolean;
    memberPrice: number;
    nonMemberPrice: number;
    maxParticipant: number;
    societyId: string;
}

export interface SocietyHighlightCreateInput {
    eventId: string;
    medias?: Nullable<PhotoAttachmentCreateInput[]>;
    societyId: string;
}

export interface SocietyPerkCreateInput {
    store: string;
    description?: Nullable<string>;
    image?: Nullable<PhotoAttachmentCreateInput>;
    societyId: string;
}

export interface SocietyMemberCreateInput {
    userId?: Nullable<string>;
    userEmail: string;
    societyId: string;
    status: SocietyMemberStatus;
    roles: SocietyMemberRole[];
    planType: SocietyMembershipPlanType;
    planEndDate?: Nullable<DateTime>;
}

export interface SocietyMemberUpdateInput {
    userId?: Nullable<string>;
    status?: Nullable<SocietyMemberStatus>;
    roles?: Nullable<SocietyMemberRole[]>;
    planType?: Nullable<SocietyMembershipPlanType>;
    planEndDate?: Nullable<DateTime>;
    reason?: Nullable<string>;
    societyMemberId: string;
}

export interface SchoolCreateInput {
    name: string;
    logo?: Nullable<PhotoAttachmentCreateInput>;
    status?: Nullable<SchoolStatus>;
    emailDomains: string[];
    country?: Nullable<Country>;
}

export interface SchoolUpdateInput {
    name?: Nullable<string>;
    logo?: Nullable<PhotoAttachmentCreateInput>;
    status?: Nullable<SchoolStatus>;
    emailDomains?: Nullable<string[]>;
    country?: Nullable<Country>;
    schoolId: string;
    isClearLogo?: Nullable<boolean>;
}

export interface ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
}

export interface AttachmentGQLType {
    attachmentFileType: AttachmentTypes;
}

export interface Node {
    id: string;
    createAt?: Nullable<DateTime>;
    updateAt?: Nullable<DateTime>;
}

export interface PaginationOutput {
    count: number;
    page: number;
    totalPages: number;
    offset: number;
    limit: number;
}

export interface DefaultResponseFormatOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
}

export interface AuthFirebaseLoginOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<string>;
}

export interface PhotoAttachment extends AttachmentGQLType {
    attachmentFileType: AttachmentTypes;
    size?: Nullable<number>;
    fileURL: string;
    fileName: string;
    filePath?: Nullable<string>;
    contentType?: Nullable<string>;
    originalFileName?: Nullable<string>;
}

export interface UserProfile {
    userId?: Nullable<string>;
    nickname?: Nullable<string>;
    profilePic?: Nullable<PhotoAttachment>;
    darkMode: boolean;
    language?: Nullable<Locale>;
    emailVerified: boolean;
    schoolId?: Nullable<string>;
    isInitUserProfile: boolean;
    createAt?: Nullable<DateTime>;
    updateAt?: Nullable<DateTime>;
}

export interface User extends Node {
    id: string;
    createAt?: Nullable<DateTime>;
    updateAt?: Nullable<DateTime>;
    authTypes: AuthType[];
    ssoProvider: SSOProvider;
    ssoUID?: Nullable<string>;
    email?: Nullable<string>;
    countryCode?: Nullable<string>;
    phone?: Nullable<string>;
    roles: UserRole[];
    status: UserStatus;
    userProfile?: Nullable<UserProfile>;
    mfaSecret?: Nullable<string>;
}

export interface AuthFirebaseRegisterOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<User>;
}

export interface UserSafe extends Node {
    authTypes: AuthType[];
    ssoProvider: SSOProvider;
    ssoUID?: Nullable<string>;
    roles: UserRole[];
    status: UserStatus;
    userProfile?: Nullable<UserProfile>;
    id: string;
    createAt?: Nullable<DateTime>;
    updateAt?: Nullable<DateTime>;
}

export interface EventToken {
    id: string;
    token: string;
    tokenOwnerId: string;
    event: EventTokenTypes;
    status: EventTokenStatus;
    createAt: DateTime;
    updateAt: DateTime;
    expireAt?: Nullable<DateTime>;
}

export interface EventTokenOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<EventToken>;
}

export interface EventTokenArrayOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<EventToken[]>;
}

export interface AuthTokenRefreshOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<string>;
}

export interface AuthCodeOutput {
    authCode?: Nullable<string>;
}

export interface LocalUserPreRegisterOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<AuthCodeOutput>;
}

export interface LocalUserRegister {
    email?: Nullable<string>;
    countryCode?: Nullable<string>;
    phone?: Nullable<string>;
    authType: AuthType;
    userId: string;
    token: string;
}

export interface LocalUserRegisterOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<LocalUserRegister>;
}

export interface LocalUserLogin {
    userId: string;
    token: string;
}

export interface LocalUserLoginOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<LocalUserLogin>;
}

export interface LocalUserPreLoginOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<AuthCodeOutput>;
}

export interface UserOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<User>;
}

export interface UserArrayOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<User[]>;
}

export interface UserProfileOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<UserProfile>;
}

export interface UserProfileArrayOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<UserProfile[]>;
}

export interface UserSafeOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<UserSafe>;
}

export interface SocietyEvent extends Node {
    id: string;
    createAt?: Nullable<DateTime>;
    updateAt?: Nullable<DateTime>;
    title: string;
    startDate: DateTime;
    endDate: DateTime;
    hostingType: string;
    hostDetail?: Nullable<string>;
    description?: Nullable<string>;
    requiringRemark: boolean;
    remark?: Nullable<string>;
    image?: Nullable<PhotoAttachment>;
    isMemberOnly: boolean;
    isHidden: boolean;
    isInteracted: boolean;
    needApproved: boolean;
    memberPrice: number;
    nonMemberPrice: number;
    maxParticipant: number;
    societyId: string;
    schoolIds: string[];
}

export interface SocietyEventOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<SocietyEvent>;
}

export interface SocietyEventArrayOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<SocietyEvent[]>;
}

export interface SocietyHighlight extends Node {
    id: string;
    createAt?: Nullable<DateTime>;
    updateAt?: Nullable<DateTime>;
    event: SocietyEvent;
    medias: PhotoAttachment[];
    societyId: string;
    schoolIds: string[];
}

export interface SocietyHighlightOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<SocietyHighlight>;
}

export interface SocietyHighlightArrayOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<SocietyHighlight[]>;
}

export interface SocietyPerk extends Node {
    id: string;
    createAt?: Nullable<DateTime>;
    updateAt?: Nullable<DateTime>;
    store: string;
    description: string;
    image?: Nullable<PhotoAttachment>;
    societyId: string;
}

export interface SocietyPerkOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<SocietyPerk>;
}

export interface SocietyPerkArrayOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<SocietyPerk[]>;
}

export interface EventParticipant extends Node {
    id: string;
    createAt?: Nullable<DateTime>;
    updateAt?: Nullable<DateTime>;
    userId: string;
    societyMemberId?: Nullable<string>;
    societyEventId: string;
    societyId: string;
    remark?: Nullable<string>;
    eventParticipantStatus: EventParticipantStatus;
}

export interface EventParticipantOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<EventParticipant>;
}

export interface EventParticipantArrayOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<EventParticipant[]>;
}

export interface PaymentOption extends Node {
    id: string;
    createAt?: Nullable<DateTime>;
    updateAt?: Nullable<DateTime>;
    title: string;
    instruction: string;
    societyId: string;
    status: CommonStatus;
    type: PaymentOptionType;
}

export interface PaymentOptionOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<PaymentOption>;
}

export interface PaymentOptionArrayOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<PaymentOption[]>;
}

export interface SocietyCategory extends Node {
    id: string;
    createAt?: Nullable<DateTime>;
    updateAt?: Nullable<DateTime>;
    schoolId?: Nullable<string>;
    name: string;
    icon: PhotoAttachment;
    status: CommonStatus;
}

export interface SocialLink {
    type: SocialLinkPlatform;
    url: string;
}

export interface SocietyMember extends Node {
    id: string;
    createAt?: Nullable<DateTime>;
    updateAt?: Nullable<DateTime>;
    userEmail: string;
    user?: Nullable<UserSafe>;
    userId?: Nullable<string>;
    society?: Nullable<Society>;
    societyId: string;
    schoolId?: Nullable<string>;
    status: SocietyMemberStatus;
    rejectReason?: Nullable<string>;
    roles: SocietyMemberRole[];
    planType: SocietyMembershipPlanType;
    planEndDate?: Nullable<DateTime>;
}

export interface SocietyMembership extends Node {
    id: string;
    createAt?: Nullable<DateTime>;
    updateAt?: Nullable<DateTime>;
    title: string;
    description: string;
    societyId: string;
    status: SocietyMembershipStatus;
    planType: SocietyMembershipPlanType;
    planYear?: Nullable<number>;
    planEndDate?: Nullable<DateTime>;
    price: string;
    priceInNumber: number;
    d: BigNumber;
}

export interface Society extends Node {
    id: string;
    createAt?: Nullable<DateTime>;
    updateAt?: Nullable<DateTime>;
    name: string;
    icon?: Nullable<PhotoAttachment>;
    backgroundImage?: Nullable<PhotoAttachment>;
    description?: Nullable<string>;
    socialLinks: SocialLink[];
    teamLeads: UserProfile[];
    memberships: SocietyMembership[];
    members: SocietyMember[];
    events: SocietyEvent[];
    highlights: SocietyHighlight[];
    perks: SocietyPerk[];
    type: SocietyType;
    status: SocietyStatus;
    schoolIds: string[];
    categoryIds: string[];
    paymentOptions?: Nullable<PaymentOption[]>;
}

export interface School extends Node {
    id: string;
    createAt?: Nullable<DateTime>;
    updateAt?: Nullable<DateTime>;
    name: string;
    logo?: Nullable<PhotoAttachment>;
    status: SchoolStatus;
    emailDomains: string[];
    societyCategorys: SocietyCategory[];
    societyLists: Society[];
    country: string;
}

export interface PublicSchool extends Node {
    name: string;
    logo?: Nullable<PhotoAttachment>;
    status: SchoolStatus;
    emailDomains: string[];
    societyCategorys: SocietyCategory[];
    country: string;
    id: string;
    createAt?: Nullable<DateTime>;
    updateAt?: Nullable<DateTime>;
}

export interface PublicSchoolOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<PublicSchool>;
}

export interface PublicSchoolArrayOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<PublicSchool[]>;
}

export interface SchoolOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<School>;
}

export interface SchoolArrayOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<School[]>;
}

export interface SocietyMemberOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<SocietyMember>;
}

export interface SocietyMemberArrayOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<SocietyMember[]>;
}

export interface SocietyMembershipOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<SocietyMembership>;
}

export interface SocietyMembershipArrayOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<SocietyMembership[]>;
}

export interface SocietyOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<Society>;
}

export interface SocietyArrayOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<Society[]>;
}

export interface SocietyCategoryOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<SocietyCategory>;
}

export interface SocietyCategoryArrayOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<SocietyCategory[]>;
}

export interface PublicSimpleSociety extends Node {
    name: string;
    icon?: Nullable<PhotoAttachment>;
    backgroundImage?: Nullable<PhotoAttachment>;
    description?: Nullable<string>;
    socialLinks: SocialLink[];
    type: SocietyType;
    status: SocietyStatus;
    schoolIds: string[];
    categoryIds: string[];
    id: string;
    createAt?: Nullable<DateTime>;
    updateAt?: Nullable<DateTime>;
}

export interface PublicSociety extends Node {
    name: string;
    icon?: Nullable<PhotoAttachment>;
    backgroundImage?: Nullable<PhotoAttachment>;
    description?: Nullable<string>;
    socialLinks: SocialLink[];
    teamLeads: UserProfile[];
    memberships: SocietyMembership[];
    events: SocietyEvent[];
    highlights: SocietyHighlight[];
    perks: SocietyPerk[];
    type: SocietyType;
    status: SocietyStatus;
    schoolIds: string[];
    categoryIds: string[];
    id: string;
    createAt?: Nullable<DateTime>;
    updateAt?: Nullable<DateTime>;
}

export interface PublicSimpleSocietyArrayOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<PublicSimpleSociety[]>;
}

export interface PublicSocietyOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<PublicSociety>;
    memberships?: Nullable<SocietyMembership[]>;
    members?: Nullable<SocietyMember[]>;
    events?: Nullable<SocietyEvent[]>;
    highlights?: Nullable<SocietyHighlight>;
    perks?: Nullable<SocietyPerk[]>;
    paymentOptions?: Nullable<PaymentOption[]>;
}

export interface EventAndParticipants extends Node {
    id: string;
    createAt?: Nullable<DateTime>;
    updateAt?: Nullable<DateTime>;
    societyEvent: SocietyEvent;
    eventParticipants?: Nullable<EventParticipant[]>;
}

export interface EventAndParticipantsGQLArrayOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<EventAndParticipants[]>;
}

export interface SMSocietyAndMember {
    society: Society;
    societyMember: SocietyMember;
}

export interface SMSocietyAndMemberOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<SMSocietyAndMember>;
}

export interface SMSocietyAndMemberArrayOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data: SMSocietyAndMember[];
}

export interface SocietyEventWithParticipant extends Node {
    id: string;
    createAt?: Nullable<DateTime>;
    updateAt?: Nullable<DateTime>;
    societyEvent: SocietyEvent;
    eventParticipant?: Nullable<EventParticipant>;
}

export interface SocietyEventWithParticipantArrayOutput extends ResponseFormat {
    isSuccess: boolean;
    code: number;
    errorMessage?: Nullable<string>;
    pagination?: Nullable<PaginationOutput>;
    data?: Nullable<SocietyEventWithParticipant[]>;
}

export interface IQuery {
    checkIsDatabaseClean(): boolean | Promise<boolean>;
    me(): UserSafe | Promise<UserSafe>;
    devUserGets(userArrayFilterInput?: Nullable<UserArrayFilterInput>): UserArrayOutput | Promise<UserArrayOutput>;
    userGet(userFilterInput: UserFilterInput): Nullable<UserOutput> | Promise<Nullable<UserOutput>>;
    usersGet(userArrayFilterInput?: Nullable<UserArrayFilterInput>): Nullable<UserArrayOutput> | Promise<Nullable<UserArrayOutput>>;
    userProfilesGet(userProfileFilterInput?: Nullable<UserProfileFilterInput>): UserProfileArrayOutput | Promise<UserProfileArrayOutput>;
    userProfileGet(userId: string): Nullable<UserProfileOutput> | Promise<Nullable<UserProfileOutput>>;
    eventTokensGet(eventTokenArrayFilterInput?: Nullable<EventTokenArrayFilterInput>): EventTokenArrayOutput | Promise<EventTokenArrayOutput>;
    eventTokenGet(id: string): Nullable<EventTokenOutput> | Promise<Nullable<EventTokenOutput>>;
    umUserGets(userArrayFilterInput?: Nullable<UserArrayFilterInput>): UserArrayOutput | Promise<UserArrayOutput>;
    umDevUsersGet(userArrayFilterInput?: Nullable<UserArrayFilterInput>): Nullable<UserArrayOutput> | Promise<Nullable<UserArrayOutput>>;
    schoolsGet(schoolFilterInput?: Nullable<SchoolFilterInput>): SchoolArrayOutput | Promise<SchoolArrayOutput>;
    schoolGet(id: string): Nullable<SchoolOutput> | Promise<Nullable<SchoolOutput>>;
    publicSchoolsGet(schoolFilterInput?: Nullable<SchoolFilterInput>): PublicSchoolArrayOutput | Promise<PublicSchoolArrayOutput>;
    publicSchoolGet(id: string): Nullable<PublicSchoolOutput> | Promise<Nullable<PublicSchoolOutput>>;
    societyCategorysGet(societyCategoryFilterInput?: Nullable<SocietyCategoryFilterInput>): SocietyCategoryArrayOutput | Promise<SocietyCategoryArrayOutput>;
    societyCategoryGet(id: string): Nullable<SocietyCategoryOutput> | Promise<Nullable<SocietyCategoryOutput>>;
    publicSocietyCategorysGet(societyCategoryFilterInput?: Nullable<SocietyCategoryFilterInput>): SocietyCategoryArrayOutput | Promise<SocietyCategoryArrayOutput>;
    publicSocietyCategoryGet(id: string): Nullable<SocietyCategoryOutput> | Promise<Nullable<SocietyCategoryOutput>>;
    societysGet(societyFilterInput?: Nullable<SocietyFilterInput>): SocietyArrayOutput | Promise<SocietyArrayOutput>;
    societyGet(id: string): Nullable<SocietyOutput> | Promise<Nullable<SocietyOutput>>;
    publicSocietysGet(societyFilterInput?: Nullable<SocietyFilterInput>): PublicSimpleSocietyArrayOutput | Promise<PublicSimpleSocietyArrayOutput>;
    publicSocietyGet(id: string): Nullable<PublicSocietyOutput> | Promise<Nullable<PublicSocietyOutput>>;
    societyMembershipsGet(societyMembershipFilterInput?: Nullable<SocietyMembershipFilterInput>): SocietyMembershipArrayOutput | Promise<SocietyMembershipArrayOutput>;
    societyMembershipGet(id: string): Nullable<SocietyMembershipOutput> | Promise<Nullable<SocietyMembershipOutput>>;
    societyMembersGet(societyMemberFilterInput?: Nullable<SocietyMemberFilterInput>): SocietyMemberArrayOutput | Promise<SocietyMemberArrayOutput>;
    societyMemberGet(id: string): Nullable<SocietyMemberOutput> | Promise<Nullable<SocietyMemberOutput>>;
    societyEventsGet(societyEventFilterInput?: Nullable<SocietyEventFilterInput>): SocietyEventArrayOutput | Promise<SocietyEventArrayOutput>;
    societyEventGet(id: string): Nullable<SocietyEventOutput> | Promise<Nullable<SocietyEventOutput>>;
    societyHighlightsGet(societyHighlightFilterInput?: Nullable<SocietyHighlightFilterInput>): SocietyHighlightArrayOutput | Promise<SocietyHighlightArrayOutput>;
    societyHighlightGet(id: string): Nullable<SocietyHighlightOutput> | Promise<Nullable<SocietyHighlightOutput>>;
    societyPerksGet(societyPerkFilterInput?: Nullable<SocietyPerkFilterInput>): SocietyPerkArrayOutput | Promise<SocietyPerkArrayOutput>;
    societyPerkGet(id: string): Nullable<SocietyPerkOutput> | Promise<Nullable<SocietyPerkOutput>>;
    eventParticipantGet(id: string): Nullable<EventParticipantOutput> | Promise<Nullable<EventParticipantOutput>>;
    eventParticipantsGet(eventParticipantFilterInput?: Nullable<EventParticipantFilterInput>): Nullable<EventParticipantArrayOutput> | Promise<Nullable<EventParticipantArrayOutput>>;
    paymentOptionsGet(paymentOptionFilterInput?: Nullable<PaymentOptionFilterInput>): PaymentOptionArrayOutput | Promise<PaymentOptionArrayOutput>;
    paymentOptionGet(id: string): Nullable<PaymentOptionOutput> | Promise<Nullable<PaymentOptionOutput>>;
    smMySchoolSocietys(): PublicSimpleSocietyArrayOutput | Promise<PublicSimpleSocietyArrayOutput>;
    smMySchoolSocietyGetById(societyId: string): PublicSocietyOutput | Promise<PublicSocietyOutput>;
    smMySocietys(): SMSocietyAndMemberArrayOutput | Promise<SMSocietyAndMemberArrayOutput>;
    smMyHighlights(smHighlightsFilterInput?: Nullable<SMHighlightsFilterInput>): SocietyHighlightArrayOutput | Promise<SocietyHighlightArrayOutput>;
    myEventsAndParticipantRecords(smMyEventFilterInput?: Nullable<SMMyEventFilterInput>): SocietyEventWithParticipantArrayOutput | Promise<SocietyEventWithParticipantArrayOutput>;
    upcomingEventsGet(smUpcomingEventsFilterInput?: Nullable<SMUpcomingEventsFilterInput>): SocietyEventArrayOutput | Promise<SocietyEventArrayOutput>;
    smAdminMyEventsParticipantsGet(smSocietyEventFilterInput: SocietyEventFilterInput): EventAndParticipantsGQLArrayOutput | Promise<EventAndParticipantsGQLArrayOutput>;
    smAdminMySociety(): SocietyOutput | Promise<SocietyOutput>;
    smAdminMySocietyCategorys(): SocietyCategoryArrayOutput | Promise<SocietyCategoryArrayOutput>;
    smAdminMySocietyMemberships(): SocietyMembershipArrayOutput | Promise<SocietyMembershipArrayOutput>;
    smAdminMyPaymentOptions(): PaymentOptionArrayOutput | Promise<PaymentOptionArrayOutput>;
}

export interface IMutation {
    cleanDatabase(): boolean | Promise<boolean>;
    firebaseUserRegister(firebaseUserRegisterInput: FirebaseUserRegisterInput): AuthFirebaseRegisterOutput | Promise<AuthFirebaseRegisterOutput>;
    firebaseUserLogin(firebaseUserLoginInput: FirebaseUserLoginInput): AuthFirebaseLoginOutput | Promise<AuthFirebaseLoginOutput>;
    tokenRefresh(): AuthTokenRefreshOutput | Promise<AuthTokenRefreshOutput>;
    localUserPreRegister(localUserPreRegisterInput: LocalUserPreRegisterInput): LocalUserPreRegisterOutput | Promise<LocalUserPreRegisterOutput>;
    localUserRegister(localUserRegisterInput: LocalUserRegisterInput): LocalUserRegisterOutput | Promise<LocalUserRegisterOutput>;
    localUserPreLogin(localUserPreLoginInput: LocalUserPreLoginInput): LocalUserPreLoginOutput | Promise<LocalUserPreLoginOutput>;
    localUserLogin(localUserLoginInput: LocalUserLoginInput): LocalUserLoginOutput | Promise<LocalUserLoginOutput>;
    mfaOTPCreate(mfaOTPCreateInput: MFAOTPCreateInput): EventTokenOutput | Promise<EventTokenOutput>;
    mfaOTPVerify(otpId: string, otpToken: string): DefaultResponseFormatOutput | Promise<DefaultResponseFormatOutput>;
    mfaOTPVerifyInHeader(): DefaultResponseFormatOutput | Promise<DefaultResponseFormatOutput>;
    devUserLogin(email: string): AuthFirebaseLoginOutput | Promise<AuthFirebaseLoginOutput>;
    umUserCreate(umUserCreateInput: UMUserCreateInput): UserOutput | Promise<UserOutput>;
    umUserUpdateById(umUserUpdateInput: UserUpdateInput): UserOutput | Promise<UserOutput>;
    umUserProfileUpdate(umUserProfileUpdateInput: UserProfileUpdateInput): UserProfileOutput | Promise<UserProfileOutput>;
    umUserDeleteById(userId: string): UserSafeOutput | Promise<UserSafeOutput>;
    umDevFirebaseEmailPasswordUserCreate(umFirebaseEmailPasswordUserCreateInput: UMFirebaseEmailPasswordUserCreateInput): UserOutput | Promise<UserOutput>;
    userProfileUpdateByUser(userProfileUpdateInput: UserProfileUpdateInput): UserProfileOutput | Promise<UserProfileOutput>;
    eventParticipantCreate(eventParticipantCreateInput: EventParticipantCreateInput): Nullable<EventParticipantOutput> | Promise<Nullable<EventParticipantOutput>>;
    eventParticipantUpdate(eventParticipantUpdateInput: EventParticipantUpdateInput): Nullable<EventParticipantOutput> | Promise<Nullable<EventParticipantOutput>>;
    eventParticipantDeleteByID(id: string): Nullable<EventParticipantOutput> | Promise<Nullable<EventParticipantOutput>>;
    smApplyForSocietyMember(smApplyForSocietyMemberInput: SMApplyForSocietyMemberInput): SocietyMemberOutput | Promise<SocietyMemberOutput>;
    smAcceptSocietyMemberInvitation(smAcceptSocietyMemberInvitationInput: SMAcceptSocietyMemberInvitationInput): SocietyMemberOutput | Promise<SocietyMemberOutput>;
    smEventParticipantJoin(smEventParticipantInput: SMEventParticipantInput): EventParticipantOutput | Promise<EventParticipantOutput>;
    smEventParticipantQuit(smEventParticipantInput: SMEventParticipantInput): EventParticipantOutput | Promise<EventParticipantOutput>;
    smAdminSocietyPublish(): SocietyOutput | Promise<SocietyOutput>;
    smAdminSocietyUpdate(smSocietyUpdateInput: SMSocietyUpdateInput): SocietyOutput | Promise<SocietyOutput>;
    smAdminSocietyArchiveById(societyId: string): SocietyOutput | Promise<SocietyOutput>;
    smAdminInviteNewMembers(smInviteNewMembersInput: SMInviteNewMembersInput): SocietyMemberArrayOutput | Promise<SocietyMemberArrayOutput>;
    smAdminPaymentOptionCreate(smPaymentOptionCreateInput: SMPaymentOptionCreateInput): PaymentOptionOutput | Promise<PaymentOptionOutput>;
    smAdminPaymentOptionUpdateById(smPaymentOptionUpdateInput: PaymentOptionUpdateInput): PaymentOptionOutput | Promise<PaymentOptionOutput>;
    smAdminPaymentOptionDeleteById(paymentOptionId: string): PaymentOptionOutput | Promise<PaymentOptionOutput>;
    smAdminSocietyMembershipCreate(smSocietyMembershipCreateInput: SMSocietyMembershipCreateInput): SocietyMembershipOutput | Promise<SocietyMembershipOutput>;
    smAdminSocietyMembershipUpdateById(smSocietyMembershipUpdateInput: SocietyMembershipUpdateInput): SocietyMembershipOutput | Promise<SocietyMembershipOutput>;
    smAdminSocietyMembershipDeleteById(societyMembershipId: string): SocietyMembershipOutput | Promise<SocietyMembershipOutput>;
    smAdminProcessSocietyMemberApplication(smProcessSocietyMemberApplicationInput: SMProcessSocietyMemberApplicationInput): SocietyMemberOutput | Promise<SocietyMemberOutput>;
    smAdminSocietyEventCreate(smSocietyEventCreateInput: SMSocietyEventCreateInput): SocietyEventOutput | Promise<SocietyEventOutput>;
    smAdminSocietyEventUpdateById(smSocietyEventUpdateInput: SocietyEventUpdateInput): SocietyEventOutput | Promise<SocietyEventOutput>;
    smAdminSocietyEventDeleteById(societyEventId: string): SocietyEventOutput | Promise<SocietyEventOutput>;
    smAdminSocietyHighlightCreate(smSocietyHighlightCreateInput: SMSocietyHighlightCreateInput): SocietyHighlightOutput | Promise<SocietyHighlightOutput>;
    smAdminSocietyHighlightUpdateById(smSocietyHighlightUpdateInput: SocietyHighlightUpdateInput): SocietyHighlightOutput | Promise<SocietyHighlightOutput>;
    smAdminSocietyHighlightDeleteById(smSocietyHighlightId: string): SocietyHighlightOutput | Promise<SocietyHighlightOutput>;
    smAdminSocietyPerkCreate(smSocietyPerkCreateInput: SMSocietyPerkCreateInput): SocietyPerkOutput | Promise<SocietyPerkOutput>;
    smAdminSocietyPerkUpdateById(smSocietyPerkUpdateInput: SocietyPerkUpdateInput): SocietyPerkOutput | Promise<SocietyPerkOutput>;
    smAdminSocietyPerkDeleteById(societyPerkId: string): SocietyPerkOutput | Promise<SocietyPerkOutput>;
    eventAdminCheckParticipant(smEventAdminCheckParticipantInput: SMEventAdminCheckParticipantInput): EventParticipantOutput | Promise<EventParticipantOutput>;
    societyCategoryCreate(societyCategoryCreateInput: SocietyCategoryCreateInput): SocietyCategoryOutput | Promise<SocietyCategoryOutput>;
    societyCategoryUpdateById(societyCategoryUpdateInput: SocietyCategoryUpdateInput): SocietyCategoryOutput | Promise<SocietyCategoryOutput>;
    societyCategoryDeleteById(societyCategoryId: string): SocietyCategoryOutput | Promise<SocietyCategoryOutput>;
    societyAndAdminCreate(smSocietyAndAdminCreateInput: SMSocietyAndAdminCreateInput): SMSocietyAndMemberOutput | Promise<SMSocietyAndMemberOutput>;
    societyCreate(societyCreateInput: SocietyCreateInput): SocietyOutput | Promise<SocietyOutput>;
    societyUpdateById(societyUpdateInput: SocietyUpdateInput): SocietyOutput | Promise<SocietyOutput>;
    societyDeleteById(societyId: string): SocietyOutput | Promise<SocietyOutput>;
    societyPublishById(societyId: string): SocietyOutput | Promise<SocietyOutput>;
    societyMembershipCreate(societyMembershipCreateInput: SocietyMembershipCreateInput): SocietyMembershipOutput | Promise<SocietyMembershipOutput>;
    societyMembershipUpdateById(societyMembershipUpdateInput: SocietyMembershipUpdateInput): SocietyMembershipOutput | Promise<SocietyMembershipOutput>;
    societyMembershipDeleteById(societyMembershipId: string): SocietyMembershipOutput | Promise<SocietyMembershipOutput>;
    societyEventCreate(societyEventCreateInput: SocietyEventCreateInput): SocietyEventOutput | Promise<SocietyEventOutput>;
    societyEventUpdateById(societyEventUpdateInput: SocietyEventUpdateInput): SocietyEventOutput | Promise<SocietyEventOutput>;
    societyEventDeleteById(societyEventId: string): SocietyEventOutput | Promise<SocietyEventOutput>;
    societyHighlightCreate(societyHighlightCreateInput: SocietyHighlightCreateInput): SocietyHighlightOutput | Promise<SocietyHighlightOutput>;
    societyHighlightUpdateById(societyHighlightUpdateInput: SocietyHighlightUpdateInput): SocietyHighlightOutput | Promise<SocietyHighlightOutput>;
    societyHighlightDeleteById(societyHighlightId: string): SocietyHighlightOutput | Promise<SocietyHighlightOutput>;
    societyPerkCreate(societyPerkCreateInput: SocietyPerkCreateInput): SocietyPerkOutput | Promise<SocietyPerkOutput>;
    societyPerkUpdateById(societyPerkUpdateInput: SocietyPerkUpdateInput): SocietyPerkOutput | Promise<SocietyPerkOutput>;
    societyPerkDeleteById(societyPerkId: string): SocietyPerkOutput | Promise<SocietyPerkOutput>;
    societyMemberCreate(societyMemberCreateInput: SocietyMemberCreateInput): SocietyMemberOutput | Promise<SocietyMemberOutput>;
    societyMemberUpdateById(societyMemberUpdateInput: SocietyMemberUpdateInput): SocietyMemberOutput | Promise<SocietyMemberOutput>;
    societyMemberDeleteById(societyMemberId: string): SocietyMemberOutput | Promise<SocietyMemberOutput>;
    schoolCreate(schoolCreateInput: SchoolCreateInput): SchoolOutput | Promise<SchoolOutput>;
    schoolUpdateById(schoolUpdateInput: SchoolUpdateInput): SchoolOutput | Promise<SchoolOutput>;
    schoolDeleteById(schoolId: string): SchoolOutput | Promise<SchoolOutput>;
}

export type DateTime = any;
export type BigNumber = any;
type Nullable<T> = T | null;

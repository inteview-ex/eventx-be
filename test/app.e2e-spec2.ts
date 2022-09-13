import { Test, TestingModule } from '@nestjs/testing'
import { BadRequestException, INestApplication } from '@nestjs/common'
import { AppModule } from '../src/app.module'
import { AdminTools, DevTools, UniplusEngine } from 'cliemt-sample/client'
import { SystemTestService } from 'src/system-test/system-test.service'
import {
  AuthType,
  CommonStatus,
  Country,
  LocalUserRegisterInput,
  School,
  SchoolCreateInput,
  SchoolStatus,
  SchoolUpdateInput,
  SocialLinkPlatform,
  Society,
  SocietyCategory,
  SocietyCategoryCreateInput,
  SocietyCreateInput,
  SocietyMember,
  SocietyMemberCreateInput,
  SocietyMemberRole,
  SocietyMembership,
  SocietyMembershipCreateInput,
  SocietyMembershipPlanType,
  SocietyMembershipStatus,
  SocietyMemberStatus,
  SocietyStatus,
  SocietyType,
  SocietyUpdateInput,
  User,
  UserRole,
  UserStatus,
  LocalUserRegister,
  LocalUserLogin,
  LocalUserPreRegisterInput,
} from 'src/graphql'

describe('AppController (e2e)', () => {
  let moduleRef: TestingModule
  let app: INestApplication
  let client: UniplusEngine
  let devTools:DevTools
  let adminTools:AdminTools
  let admin: User
  let userA: User
  let userB: User
  let userC: User
  let adminEmail: string = 'admin@test.com'
  let commonPassword: string = 'A1b2c3d4'
  let userEmailA = 'userA@test.com'
  let userEmailB = 'userB@test.com'
  let userEmailC = 'userC@test.com'
  let adminToken = ''
  let userToken = ''
  let globalSchoolA: School
  let globalSchoolB: School
  const roundToDP = (num:number | string, dp:number) =>{
    let _num = Number(num)
    let dpStep = 10 ** dp
    return Math.round((_num + Number.EPSILON) * dpStep) / dpStep
  }
  const checkJWT = (val:string) =>{
    expect(val).toMatch(/(\..*){2,}/)
  }
  const checkUUID = (val: string, version: '1' | '2' | '3' | '4' | '5') => {
    switch (version) {
      case '1':
        expect(val).toMatch(
          /^[0-9A-F]{8}-[0-9A-F]{4}-[1][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
        )
        break
      case '2':
        expect(val).toMatch(
          /^[0-9A-F]{8}-[0-9A-F]{4}-[2][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
        )
        break
      case '3':
        expect(val).toMatch(
          /^[0-9A-F]{8}-[0-9A-F]{4}-[3][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
        )
        break
      case '4':
        expect(val).toMatch(
          /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
        )
        break
      case '5':
        expect(val).toMatch(
          /^[0-9A-F]{8}-[0-9A-F]{4}-[5][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
        )
        break
      default:
        throw new BadRequestException('version not match')
    }
  }

  const simpleObjectCompare = (
    objA: Record<string, any>,
    objB: Record<string, any>
  ) => {
    const keysSet = new Set([objA.keys, objB.keys])
    const keys = keysSet.values
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      if (objA[key] !== objB[key]) {
        return false
      }
    }
    return true
  }

  const checkAndCleanDB = async () => {
    const systemTestService = moduleRef.get(SystemTestService)
    await systemTestService.cleanDatabase()
    const isClean = await systemTestService.checkIsDatabaseClean()
    return isClean
  }
  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    await app.init()
    const port = process.env.PORT || 3001
    await app.listen(port)

    // init client
    const url = await app.getUrl()
    const _gqlURL = `${url}/graphql`
    client = UniplusEngine.getInstance('temp', {
      gqlURL: _gqlURL,
    })
    devTools = client.getDevTools()
  })

  describe('Clean DB', () => {
    it('should clear test DB', async () => {
      const isClean = await checkAndCleanDB()
      expect(isClean).toBe(true)
    })
  })
  describe('Public endpoint test', () => {
    it('should return an admin', async () => {

      const adminResult = await client.publicSchoolsGet({
      })
      expect(adminResult.code).toBe(200)
      expect(adminResult.isSuccess).toBe(true)
      expect(adminResult.errorMessage).toBe(null)
    })
  })
  describe('Create Test Account for Admin and User', () => {
    it('should return an admin', async () => {

      const adminResult = await devTools.umDevFirebaseEmailPasswordUserCreate({
        email: adminEmail,
        password: commonPassword,
        roles: [UserRole.ADMIN],
        status: UserStatus.ACTIVE,
      })
      expect(adminResult.code).toBe(200)
      expect(adminResult.isSuccess).toBe(true)
      expect(adminResult.errorMessage).toBe(null)

      admin = adminResult.data!!
      checkUUID(admin.id, '4')
      expect(admin.email).toBe(adminEmail)
      expect(admin.roles).toContain(UserRole.ADMIN)
      expect(admin.status).toBe(UserStatus.ACTIVE)
    })

    it('should return a userA', async () => {
      const userResult = await devTools.umDevFirebaseEmailPasswordUserCreate({
        email: userEmailA,
        password: commonPassword,
        roles: [UserRole.USER],
        status: UserStatus.ACTIVE,
      })
      expect(userResult.code).toBe(200)
      expect(userResult.isSuccess).toBe(true)
      expect(userResult.errorMessage).toBe(null)

      userA = userResult.data!
      checkUUID(userA.id, '4')
      expect(userA.email).toBe(userEmailA)
      expect(userA.roles).toContain(UserRole.USER)
      expect(userA.status).toBe(UserStatus.ACTIVE)
    })

    it('should return a userB', async () => {
      const userResult = await devTools.umDevFirebaseEmailPasswordUserCreate({
        email: userEmailB,
        password: commonPassword,
        roles: [UserRole.USER],
        status: UserStatus.ACTIVE,
      })
      expect(userResult.code).toBe(200)
      expect(userResult.isSuccess).toBe(true)
      expect(userResult.errorMessage).toBe(null)

      userB = userResult.data!
      checkUUID(userB.id, '4')
      expect(userB.email).toBe(userEmailB)
      expect(userB.roles).toContain(UserRole.USER)
      expect(userB.status).toBe(UserStatus.ACTIVE)
    })

    it('should return a userC', async () => {
      const userResult = await devTools.umDevFirebaseEmailPasswordUserCreate({
        email: userEmailC,
        password: commonPassword,
        roles: [UserRole.USER],
        status: UserStatus.ACTIVE,
      })
      expect(userResult.code).toBe(200)
      expect(userResult.isSuccess).toBe(true)
      expect(userResult.errorMessage).toBe(null)

      userC = userResult.data!
      checkUUID(userC.id, '4')
      expect(userC.email).toBe(userEmailC)
      expect(userC.roles).toContain(UserRole.USER)
      expect(userC.status).toBe(UserStatus.ACTIVE)
    })
  })

  describe('Create JWT Token By DevUserLogin', () => {
    
    it('should return an admin jwt token', async () => {
      const result = await devTools.devUserLogin(adminEmail)
      expect(result.code).toBe(200)
      expect(result.isSuccess).toBe(true)
      expect(result.errorMessage).toBe(null)
      // expect(result.data!).toMatch(/(\..*){2,}/)
      checkJWT(result.data!)

      // update client
      adminToken = result.data!
      client.setTokenKey(adminToken)
      adminTools = client.getAdminTools()
    })

    it('should return an user jwt token', async () => {
      const result = await devTools.devUserLogin(userEmailA)
      expect(result.code).toBe(200)
      expect(result.isSuccess).toBe(true)
      expect(result.errorMessage).toBe(null)
      expect(result.data!).toMatch(/(\..*){2,}/)

      userToken = result.data!
    })
  })

  describe('Registration AuthCode test', () => {
    it('should register & login a local email account', async () => {
      let preRegisterInput:LocalUserPreRegisterInput = {authType:AuthType.EMAIL, email:"999@gmail.com"}
      let input:LocalUserRegisterInput = {...preRegisterInput}
      const preRegisterResult = await client.localUserPreRegister(preRegisterInput) 

      expect(preRegisterResult.code).toBe(200)
      expect(preRegisterResult.isSuccess).toBe(true)
      expect(preRegisterResult.data!.authCode).toHaveLength(6)

      input.authCode = preRegisterResult.data!.authCode
      const registerResult = await client.localUserRegister(input) 
      expect(registerResult.code).toBe(200)
      expect(registerResult.isSuccess).toBe(true)

      let authResult:LocalUserRegister = registerResult.data!
      checkUUID(authResult.userId,"4")
      expect(authResult.authType).toBe(input.authType)
      expect(authResult.email).toBe(input.email)
      checkJWT(authResult.token)
      
      // login test
      delete input.authCode
      const preLoginResult = await client.localUserPreLogin({...preRegisterInput}) 

      expect(preLoginResult.code).toBe(200)
      expect(preLoginResult.isSuccess).toBe(true)
      expect(preLoginResult.data!.authCode).toHaveLength(6)

      input.authCode = preLoginResult.data!.authCode
      const loginResult = await client.localUserLogin({...input}) 
      expect(loginResult.code).toBe(200)
      expect(loginResult.isSuccess).toBe(true)

      let authLoginResult:LocalUserLogin = registerResult.data!
      checkUUID(authLoginResult.userId,"4")
      checkJWT(authResult.token)
    })

    it('should block email reg without email', async () => {
      let input:LocalUserRegisterInput = {authType:AuthType.EMAIL, }
      const preRegisterResult = await client.localUserPreRegister(input) 

      expect(preRegisterResult.code).toBe(400)
    })

    it('should register a local phone account', async () => {
      let input:LocalUserRegisterInput = {authType:AuthType.PHONE, countryCode:"852", phone:"11112222"}
      const preRegisterResult = await client.localUserPreRegister(input) 

      expect(preRegisterResult.code).toBe(200)
      expect(preRegisterResult.isSuccess).toBe(true)
      expect(preRegisterResult.data!.authCode).toHaveLength(6)

      input.authCode = preRegisterResult.data!.authCode
      const registerResult = await client.localUserRegister(input) 
      expect(registerResult.code).toBe(200)
      expect(registerResult.isSuccess).toBe(true)

      let authResult:LocalUserRegister = registerResult.data!
      checkUUID(authResult.userId,"4")
      expect(authResult.authType).toBe(input.authType)
      expect(authResult.countryCode).toBe(input.countryCode)
      expect(authResult.phone).toBe(input.phone)
      checkJWT(authResult.token)
    })

    it('should block phone reg without countryCode', async () => {
      let input:LocalUserRegisterInput = {authType:AuthType.PHONE, phone:"12312312"}
      const preRegisterResult = await client.localUserPreRegister(input) 
      expect(preRegisterResult.code).toBe(400)
    })

    it('should block phone reg without phone', async () => {
      let input:LocalUserRegisterInput = {authType:AuthType.PHONE, countryCode:"122"}
      const preRegisterResult = await client.localUserPreRegister(input) 
      expect(preRegisterResult.code).toBe(400)
    })

    it('should block phone reg error CountryCode and phone', async () => {
      let input:LocalUserRegisterInput = {authType:AuthType.PHONE, countryCode:"11112222", phone:"852"}
      const preRegisterResult = await client.localUserPreRegister(input) 
      expect(preRegisterResult.code).toBe(500)
    })

    it('should block non-exist register auth code check', async () => {
      let input:LocalUserRegisterInput = {authType:AuthType.PHONE, countryCode:"852", phone:"99999999"}
      const preRegisterResult = await client.localUserRegister(input) 
      expect(preRegisterResult.code).toBe(500)
    })
  })

  describe('School Mangement CURD', () => {
    let school: School
    it('should return a school', async () => {
      let dummySchoolInput: SchoolCreateInput = {
        name: 'test school',
        status: SchoolStatus.ACTIVE,
        emailDomains: ['happy.ecu.hk', 'chaps.edu.hk'],
        country: Country.HONG_KONG,
        logo:{
          fileName:"1200px-Orange-Fruit-Pieces.jpg",
          fileURL:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Orange-Fruit-Pieces.jpg/1200px-Orange-Fruit-Pieces.jpg',
        }
      }
      const result = await adminTools.schoolCreate(dummySchoolInput)

      expect(result.code).toBe(200)
      expect(result.isSuccess).toBe(true)
      expect(result.errorMessage).toBe(null)
      school = result.data!
      expect(school.name).toBe(dummySchoolInput.name)
      expect(school.emailDomains?.sort()).toEqual(
        dummySchoolInput.emailDomains?.sort()
      )
      expect(school.status).toBe(dummySchoolInput.status)
      expect(school.country).toBe(dummySchoolInput.country)
      expect(school.logo).toEqual(dummySchoolInput.logo)
    })

    it('should match school default', async () => {
      let dummySchoolInput2: SchoolCreateInput = {
        name: 'test school 2',
        emailDomains: ['happy.edu.hk'],
      }
      const result = await adminTools.schoolCreate(dummySchoolInput2)
      expect(result.code).toBe(200)
      expect(result.isSuccess).toBe(true)
      expect(result.errorMessage).toBe(null)
      const localSchool = result.data!
      expect(localSchool.name).toBe(dummySchoolInput2.name)
      // expect(school.emailDomains?.sort()).toHaveLength(1)
      expect(localSchool.emailDomains?.sort()).toEqual(
        dummySchoolInput2.emailDomains?.sort()
      )
      expect(localSchool.status).toBe(SchoolStatus.ACTIVE)
      expect(localSchool.country).toBe(Country.DEFAULT)
      expect(localSchool.logo).toBe(null)
    })

    it('school create error', async () => {
      let dummySchoolInput2: Partial<SchoolCreateInput> = {
        name: 'test school 3',
      }
      expect(
        adminTools.schoolCreate(dummySchoolInput2 as any)
      ).rejects.toThrowError(/schoolCreate error. /)
    })

    it('should update school', async () => {
      let input: SchoolUpdateInput = {
        name: 'new name',
        emailDomains: ['haha.edu.hk'],
        status: SchoolStatus.ACTIVE,
        schoolId: school.id,
        isClearLogo: true,
      }
      const result = await adminTools.schoolUpdateById(input)
      expect(result.code).toBe(200)
      expect(result.isSuccess).toBe(true)
      expect(result.errorMessage).toBe(null)

      const localSchool = result.data!
      expect(localSchool.name).toBe(input.name)
      // expect(school.emailDomains?.sort()).toHaveLength(1)
      expect(localSchool.emailDomains?.sort()).toEqual(input.emailDomains?.sort())
      expect(localSchool.status).toBe(input.status)
      expect(localSchool.logo).toBe(null)

      // update school data
      school = result.data!
    })

    it('should delete school', async () => {
      const result = await adminTools.schoolDeleteById(school.id)
      expect(result.code).toBe(200)
      expect(result.isSuccess).toBe(true)
      expect(result.errorMessage).toBe(null)

      expect(school.id).toBe(school.id)
      expect(school.name).toBe(school.name)
    })

    it('should delete school once only', async () => {
      const result = await adminTools.schoolDeleteById(school.id)
      expect(result.code).toBe(500)
      expect(result.isSuccess).toBe(false)
      expect(result.data!).toBe(null)
      expect(result.errorMessage).toMatch(/Failed to delete /)
    })
  })

  describe('Society Mangement CURD', () => {
    let societySingleU: Society
    let societyJoinU: Society
    let societyPublic: Society
    let societyForDelete: Society
    let societyCategoryA:SocietyCategory
    let societyCategoryB:SocietyCategory
    it('Prepare school before start', async () => {
      let dummySchoolInput: SchoolCreateInput = {
        name: 'test school',
        status: SchoolStatus.ACTIVE,
        emailDomains: ['happy.ecu.hk', 'chaps.edu.hk'],
        country: Country.HONG_KONG,
        logo:
          {
          fileName:"1200px-Orange-Fruit-Pieces.jpg",
          fileURL:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Orange-Fruit-Pieces.jpg/1200px-Orange-Fruit-Pieces.jpg',
        },
      }
      let dummySchoolInput2: SchoolCreateInput = {
        name: 'school 2',
        status: SchoolStatus.ACTIVE,
        emailDomains: ['aaa.ecu.hk', 'bbb.edu.hk'],
        country: Country.CHINA,
        logo:
          {
          fileName:"1200px-Orange-Fruit-Pieces.jpg",
          fileURL:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Orange-Fruit-Pieces.jpg/1200px-Orange-Fruit-Pieces.jpg',
        },
      }
      const result = await adminTools.schoolCreate(dummySchoolInput)
      const result2 = await adminTools.schoolCreate(dummySchoolInput2)

      expect(result.code).toBe(200)
      expect(result.isSuccess).toBe(true)
      expect(result.errorMessage).toBe(null)

      expect(result2.code).toBe(200)
      expect(result2.isSuccess).toBe(true)
      expect(result2.errorMessage).toBe(null)

      globalSchoolA = result.data!
      globalSchoolB = result2.data!
    })

    it('Prepare society category before start', async () => {
      let input: SocietyCategoryCreateInput = {
        name: 'test',
        icon: {
          fileURL: 'https://www.collinsdictionary.com/images/full/orange_342874121.jpg',
          fileName: 'orange_342874121.jpg',
        },
        schoolId: globalSchoolA.id,
        status: CommonStatus.ACTIVE,
      }
      let input2: SocietyCategoryCreateInput = {
        name: 'test 2',
        icon: {
          fileURL: 'https://www.collinsdictionary.com/images/full/orange_342874121.jpg',
          fileName: 'orange_342874121.jpg',
        },
        schoolId: globalSchoolB.id,
        status: CommonStatus.ACTIVE,
      }
      const result = await adminTools.societyCategoryCreate(input)
      const result2 = await adminTools.societyCategoryCreate(input2)

      expect(result.code).toBe(200)
      expect(result.isSuccess).toBe(true)
      expect(result.errorMessage).toBe(null)

      expect(result2.code).toBe(200)
      expect(result2.isSuccess).toBe(true)
      expect(result2.errorMessage).toBe(null)

      societyCategoryA = result.data!!
      societyCategoryB = result2.data!!
    })

    it('should return a PRE_PUBLISH SINGLE_UNIVERSITY society', async () => {
      let dummySocietyInput: SocietyCreateInput = {
        name: 'asd',
        description: 'test',
        categoryIds: [societyCategoryA.id],
        schoolIds: [globalSchoolA.id],
        type: SocietyType.SINGLE_UNIVERSITY,
        icon:{
          fileName:"1200px-Orange-Fruit-Pieces.jpg",
          fileURL:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Orange-Fruit-Pieces.jpg/1200px-Orange-Fruit-Pieces.jpg',
        },
        backgroundImage:{
          fileName:"1200px-Orange-Fruit-Pieces.jpg",
          fileURL:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Orange-Fruit-Pieces.jpg/1200px-Orange-Fruit-Pieces.jpg',
        },
        status: SocietyStatus.PRE_PUBLISH,
        socialLinks: [
          {
            type: SocialLinkPlatform.INSTAGRAM,
            url: 'https://www.facebook.com/',
          },
          {
            type: SocialLinkPlatform.FACEBOOK,
            url: 'https://www.ig.com/',
          },
        ],
      }
      const result = await adminTools.societyCreate(dummySocietyInput)

      expect(result.code).toBe(200)
      expect(result.isSuccess).toBe(true)
      expect(result.errorMessage).toBe(null)
      societySingleU = result.data!
      expect(societySingleU.name).toBe(dummySocietyInput.name)
      expect(societySingleU.icon).toEqual(dummySocietyInput.icon)
      expect(societySingleU.description).toBe(dummySocietyInput.description)
      expect(societySingleU.socialLinks).toHaveLength(
        dummySocietyInput.socialLinks?.length ?? 0
      )
      for (let i = 0; i < societySingleU.socialLinks.length; i++) {
        const elementA = societySingleU.socialLinks[i]
        const elementB = Array.isArray(dummySocietyInput.socialLinks) ? dummySocietyInput.socialLinks[i] : null
        const isSame = simpleObjectCompare(elementA, elementB)
        expect(isSame).toBe(true)
      }
      expect(societySingleU.backgroundImage).toEqual(
        dummySocietyInput.backgroundImage
      )
      expect(societySingleU.type).toBe(dummySocietyInput.type)
      expect(societySingleU.status).toBe(dummySocietyInput.status)
      expect(societySingleU.schoolIds?.sort()).toEqual(
        dummySocietyInput.schoolIds?.sort()
      )
      expect(societySingleU.categoryIds?.sort()).toEqual(
        dummySocietyInput.categoryIds?.sort()
      )
    })

    it('should return a ACTIVE JOIN_UNIVERSITY society', async () => {
      let dummySocietyInput: SocietyCreateInput = {
        name: 'asd',
        description: 'test',
        categoryIds: [societyCategoryA.id],
        schoolIds: [globalSchoolA.id, globalSchoolB.id],
        type: SocietyType.JOIN_UNIVERSITY,
        icon:{
          fileName:"1200px-Orange-Fruit-Pieces.jpg",
          fileURL:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Orange-Fruit-Pieces.jpg/1200px-Orange-Fruit-Pieces.jpg',
        },
        backgroundImage:{
          fileName:"1200px-Orange-Fruit-Pieces.jpg",
          fileURL:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Orange-Fruit-Pieces.jpg/1200px-Orange-Fruit-Pieces.jpg',
        },
        status: SocietyStatus.ACTIVE,
        socialLinks: [
          {
            type: SocialLinkPlatform.INSTAGRAM,
            url: 'https://www.facebook.com/',
          },
          {
            type: SocialLinkPlatform.FACEBOOK,
            url: 'https://www.ig.com/',
          },
        ],
      }
      const result = await adminTools.societyCreate(dummySocietyInput)

      expect(result.code).toBe(200)
      expect(result.isSuccess).toBe(true)
      expect(result.errorMessage).toBe(null)
      societyJoinU = result.data!
      expect(societyJoinU.name).toBe(dummySocietyInput.name)
      expect(societyJoinU.icon).toEqual(dummySocietyInput.icon)
      expect(societyJoinU.description).toBe(dummySocietyInput.description)
      expect(societyJoinU.socialLinks).toHaveLength(
        dummySocietyInput.socialLinks?.length ?? 0
      )
      for (let i = 0; i < societyJoinU.socialLinks.length; i++) {
        const elementA = societyJoinU.socialLinks[i]
        const elementB = Array.isArray(dummySocietyInput.socialLinks) ? dummySocietyInput.socialLinks[i] : undefined
        const isSame = simpleObjectCompare(elementA, elementB)
        expect(isSame).toBe(true)
      }
      expect(societyJoinU.backgroundImage).toEqual(
        dummySocietyInput.backgroundImage
      )
      expect(societyJoinU.type).toBe(dummySocietyInput.type)
      expect(societyJoinU.status).toBe(dummySocietyInput.status)
      expect(societyJoinU.schoolIds?.sort()).toEqual(
        dummySocietyInput.schoolIds?.sort()
      )
      expect(societyJoinU.categoryIds?.sort()).toEqual(
        dummySocietyInput.categoryIds?.sort()
      )
    })

    it('should return a INACTIVE PUBLIC society', async () => {
      let dummySocietyInput: SocietyCreateInput = {
        name: 'asd',
        description: 'test',
        categoryIds: [societyCategoryA.id],
        schoolIds: [],
        type: SocietyType.PUBLIC,
        icon:{
          fileName:"1200px-Orange-Fruit-Pieces.jpg",
          fileURL:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Orange-Fruit-Pieces.jpg/1200px-Orange-Fruit-Pieces.jpg',
        },
        backgroundImage:{
          fileName:"1200px-Orange-Fruit-Pieces.jpg",
          fileURL:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Orange-Fruit-Pieces.jpg/1200px-Orange-Fruit-Pieces.jpg',
        },
        status: SocietyStatus.INACTIVE,
        socialLinks: [
          {
            type: SocialLinkPlatform.INSTAGRAM,
            url: 'https://www.facebook.com/',
          },
          {
            type: SocialLinkPlatform.FACEBOOK,
            url: 'https://www.ig.com/',
          },
        ],
      }
      const result = await adminTools.societyCreate(dummySocietyInput)

      expect(result.code).toBe(200)
      expect(result.isSuccess).toBe(true)
      expect(result.errorMessage).toBe(null)
      societyPublic = result.data!
      expect(societyPublic.name).toBe(dummySocietyInput.name)
      expect(societyPublic.icon).toEqual(dummySocietyInput.icon)
      expect(societyPublic.description).toBe(dummySocietyInput.description)
      expect(societyPublic.socialLinks).toHaveLength(
        dummySocietyInput.socialLinks?.length ?? 0
      )
      for (let i = 0; i < societyPublic.socialLinks.length; i++) {
        const elementA = societyPublic.socialLinks[i]
        const elementB = Array.isArray(dummySocietyInput.socialLinks) ? dummySocietyInput.socialLinks[i] : undefined
        const isSame = simpleObjectCompare(elementA, elementB)
        expect(isSame).toBe(true)
      }
      expect(societyPublic.backgroundImage).toEqual(
        dummySocietyInput.backgroundImage
      )
      expect(societyPublic.type).toBe(dummySocietyInput.type)
      expect(societyPublic.status).toBe(dummySocietyInput.status)
      expect(societyPublic.schoolIds?.sort()).toEqual(
        dummySocietyInput.schoolIds?.sort()
      )
      expect(societyPublic.categoryIds?.sort()).toEqual(
        dummySocietyInput.categoryIds?.sort()
      )
    })

    it('should return a INACTIVE PUBLIC society', async () => {
      let dummySocietyInput: SocietyCreateInput = {
        name: 'asd',
        description: 'test',
        categoryIds: [societyCategoryA.id],
        schoolIds: [],
        type: SocietyType.PUBLIC,
        icon:{
          fileName:"1200px-Orange-Fruit-Pieces.jpg",
          fileURL:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Orange-Fruit-Pieces.jpg/1200px-Orange-Fruit-Pieces.jpg',
        },
        backgroundImage:{
          fileName:"1200px-Orange-Fruit-Pieces.jpg",
          fileURL:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Orange-Fruit-Pieces.jpg/1200px-Orange-Fruit-Pieces.jpg',
        },
        status: SocietyStatus.INACTIVE,
        socialLinks: [
          {
            type: SocialLinkPlatform.INSTAGRAM,
            url: 'https://www.facebook.com/',
          },
          {
            type: SocialLinkPlatform.FACEBOOK,
            url: 'https://www.ig.com/',
          },
        ],
      }
      const result = await adminTools.societyCreate(dummySocietyInput)

      expect(result.code).toBe(200)
      expect(result.isSuccess).toBe(true)
      expect(result.errorMessage).toBe(null)
      societyForDelete = result.data!
      expect(societyForDelete.name).toBe(dummySocietyInput.name)
      expect(societyForDelete.icon).toEqual(dummySocietyInput.icon)
      expect(societyForDelete.description).toBe(dummySocietyInput.description)
      expect(societyForDelete.socialLinks).toHaveLength(
        dummySocietyInput.socialLinks?.length ?? 0
      )
      for (let i = 0; i < societyForDelete.socialLinks.length; i++) {
        const elementA = societyForDelete.socialLinks[i]
        const elementB = Array.isArray(dummySocietyInput.socialLinks) ? dummySocietyInput.socialLinks[i] : undefined
        const isSame = simpleObjectCompare(elementA, elementB)
        expect(isSame).toBe(true)
      }
      expect(societyForDelete.backgroundImage).toEqual(
        dummySocietyInput.backgroundImage
      )
      expect(societyForDelete.type).toBe(dummySocietyInput.type)
      expect(societyForDelete.status).toBe(dummySocietyInput.status)
      expect(societyForDelete.schoolIds?.sort()).toEqual(
        dummySocietyInput.schoolIds?.sort()
      )
      expect(societyForDelete.categoryIds?.sort()).toEqual(
        dummySocietyInput.categoryIds?.sort()
      )
    })

    it('society create error', async () => {
      let dummySocietyInput2: Partial<SocietyCreateInput> = {
        name: 'test society 3',
      }
      expect(
        adminTools.societyCreate(dummySocietyInput2 as any)
      ).rejects.toThrowError(/societyCreate error. /)
    })

    it('should update society', async () => {
      let input: SocietyUpdateInput = {
        name: '111222',
        description: 'asdasdasd',
        socialLinks: [
          {
            type: SocialLinkPlatform.INSTAGRAM,
            url: 'https://www.facebook.com/',
          },
        ],
        isClearBackgroundImage:true,
        isClearIcon:true,
        societyId:societySingleU.id
      }
      const result = await adminTools.societyUpdateById(input)
      expect(result.code).toBe(200)
      expect(result.isSuccess).toBe(true)
      expect(result.errorMessage).toBe(null)

      const localSociety = result.data!
      expect(localSociety.name).toBe(input.name)
      expect(localSociety.description).toBe(input.description)
      expect(localSociety.socialLinks).toEqual(input.socialLinks)
      expect(localSociety?.backgroundImage).toBe(null)
      expect(localSociety.icon).toBe(null)

      // update society data
      societySingleU = result.data!
    })

    // it('should update society fail', async () => {
    //   let input: SocietyUpdateInput = {
    //     type:SocietyType.JOIN_UNIVERSITY,
    //     societyId:societyA.id
    //   }
    //   const result = await adminTools.societyUpdateById(input)
    //   expect(result.code).toBe(400)
    //   expect(result.isSuccess).toBe(false)
    //   expect(result.errorMessage).toMatch(/Fail/)

    // })

    // it('should update society fail', async () => {
    //   let input: SocietyUpdateInput = {
    //     type:SocietyType.SINGLE_UNIVERSITY,
    //     societyId:societyA.id
    //   }
    //   const result = await adminTools.societyUpdateById(input)
    //   expect(result.code).toBe(400)
    //   expect(result.isSuccess).toBe(false)
    //   expect(result.errorMessage).toMatch(/Fail/)

    // })

    // it('should update society fail', async () => {
    //   let input: SocietyUpdateInput = {
    //     type:SocietyType.SINGLE_UNIVERSITY,
    //     societyId:societyA.id
    //   }
    //   const result = await adminTools.societyUpdateById(input)
    //   expect(result.code).toBe(400)
    //   expect(result.isSuccess).toBe(false)
    //   expect(result.errorMessage).toMatch(/Fail/)

    // })

    it('should delete society', async () => {
      const result = await adminTools.societyDeleteById(societyForDelete.id)
      expect(result.code).toBe(200)
      expect(result.isSuccess).toBe(true)
      expect(result.errorMessage).toBe(null)
      const localSociety = result.data!
      expect(localSociety.id).toBe(societyForDelete.id)
      expect(localSociety.name).toBe(societyForDelete.name)
    })

    it('should delete society once only', async () => {
      const result = await adminTools.societyDeleteById(societyForDelete.id)
      expect(result.code).toBe(500)
      expect(result.isSuccess).toBe(false)
      expect(result.data!).toBe(null)
      expect(result.errorMessage).toMatch(/Failed to delete /)
    })


    // SocietyMembership
    let societyMembershipPermenant:SocietyMembership
    let societyMembershipYear:SocietyMembership
    let societyMembershipDedicate:SocietyMembership
    let societyMembershipForDelete:SocietyMembership

    it('should return a PERMANENT societyMembership', async () => {
      let dummySocietyMembershipInput: SocietyMembershipCreateInput = {
        title:"PERMANENT Membership",
        description:"one year pass. start from join date.",
        status:SocietyMembershipStatus.ACTIVE,
        planType:SocietyMembershipPlanType.PERMANENT,
        societyId:societySingleU.id,
        price:"11111.145",
      }
      const result = await adminTools.societyMembershipCreate(dummySocietyMembershipInput)

      expect(result.code).toBe(200)
      expect(result.isSuccess).toBe(true)
      expect(result.errorMessage).toBe(null)
      societyMembershipPermenant = result.data!
      expect(societyMembershipPermenant.title).toBe(dummySocietyMembershipInput.title)
      expect(societyMembershipPermenant.description).toBe(dummySocietyMembershipInput.description)
      expect(societyMembershipPermenant.status).toBe(dummySocietyMembershipInput.status)
      expect(societyMembershipPermenant.planType).toBe(dummySocietyMembershipInput.planType)
      expect(societyMembershipPermenant.societyId).toBe(dummySocietyMembershipInput.societyId)
      let finalPrice = roundToDP(dummySocietyMembershipInput.price!,2)
      expect(societyMembershipPermenant.price).toBe(finalPrice.toString())
      expect(societyMembershipPermenant.priceInNumber).toBe(finalPrice)
    })

    it('should return a YEAR societyMembership', async () => {
      let dummySocietyMembershipInput: SocietyMembershipCreateInput = {
        title:"Year Membership",
        description:"one year pass. start from join date.",
        status:SocietyMembershipStatus.ACTIVE,
        planType:SocietyMembershipPlanType.YEAR,
        planYear:2,
        societyId:societySingleU.id,
        price:"0.99",
      }
      const result = await adminTools.societyMembershipCreate(dummySocietyMembershipInput)

      expect(result.code).toBe(200)
      expect(result.isSuccess).toBe(true)
      expect(result.errorMessage).toBe(null)
      societyMembershipYear = result.data!
      expect(societyMembershipYear.title).toBe(dummySocietyMembershipInput.title)
      expect(societyMembershipYear.description).toBe(dummySocietyMembershipInput.description)
      expect(societyMembershipYear.status).toBe(dummySocietyMembershipInput.status)
      expect(societyMembershipYear.planType).toBe(dummySocietyMembershipInput.planType)
      expect(societyMembershipYear.planYear).toBe(dummySocietyMembershipInput.planYear)
      expect(societyMembershipYear.societyId).toBe(dummySocietyMembershipInput.societyId)
      let finalPrice = roundToDP(dummySocietyMembershipInput.price!,2)
      expect(societyMembershipYear.price).toBe(finalPrice.toString())
      expect(societyMembershipYear.priceInNumber).toBe(finalPrice)
    })

    
    it('should return a DEDICATED societyMembership', async () => {
      let dummySocietyMembershipInput: SocietyMembershipCreateInput = {
        title:"DEDICATED Membership",
        description:"one year pass. start from join date.",
        status:SocietyMembershipStatus.ACTIVE,
        planType:SocietyMembershipPlanType.DEDICATED,
        planEndDate:new Date().toISOString(),
        societyId:societySingleU.id,
        price:"0.99",
      }
      const result = await adminTools.societyMembershipCreate(dummySocietyMembershipInput)

      expect(result.code).toBe(200)
      expect(result.isSuccess).toBe(true)
      expect(result.errorMessage).toBe(null)
      societyMembershipDedicate = result.data!
      expect(societyMembershipDedicate.title).toBe(dummySocietyMembershipInput.title)
      expect(societyMembershipDedicate.description).toBe(dummySocietyMembershipInput.description)
      expect(societyMembershipDedicate.status).toBe(dummySocietyMembershipInput.status)
      expect(societyMembershipDedicate.planType).toBe(dummySocietyMembershipInput.planType)
      expect(societyMembershipDedicate.planEndDate).toBe(dummySocietyMembershipInput.planEndDate)
      expect(societyMembershipDedicate.societyId).toBe(dummySocietyMembershipInput.societyId)
      let finalPrice = roundToDP(dummySocietyMembershipInput.price!,2)
      expect(societyMembershipDedicate.price).toBe(finalPrice.toString())
      expect(societyMembershipDedicate.priceInNumber).toBe(finalPrice)
    })

    it('should return a TO DELETE societyMembership', async () => {
      let dummySocietyMembershipInput: SocietyMembershipCreateInput = {
        title:"PERMANENT Membership",
        description:"one year pass. start from join date.",
        status:SocietyMembershipStatus.INACTIVE,
        planType:SocietyMembershipPlanType.PERMANENT,
        societyId:societySingleU.id,
        price:"11111.145",
      }
      const result = await adminTools.societyMembershipCreate(dummySocietyMembershipInput)

      expect(result.code).toBe(200)
      expect(result.isSuccess).toBe(true)
      expect(result.errorMessage).toBe(null)
      societyMembershipForDelete = result.data!
      expect(societyMembershipForDelete.title).toBe(dummySocietyMembershipInput.title)
      expect(societyMembershipForDelete.description).toBe(dummySocietyMembershipInput.description)
      expect(societyMembershipForDelete.status).toBe(dummySocietyMembershipInput.status)
      expect(societyMembershipForDelete.planType).toBe(dummySocietyMembershipInput.planType)
      expect(societyMembershipForDelete.societyId).toBe(dummySocietyMembershipInput.societyId)
      let finalPrice = roundToDP(dummySocietyMembershipInput.price!,2)
      expect(societyMembershipForDelete.price).toBe(finalPrice.toString())
      expect(societyMembershipForDelete.priceInNumber).toBe(finalPrice)
    })

    it('should delete societyMembership', async () => {
      const result = await adminTools.societyMembershipDeleteById(societyMembershipForDelete.id)
      expect(result.code).toBe(200)
      expect(result.isSuccess).toBe(true)
      expect(result.errorMessage).toBe(null)
      const localSocietyMembership = result.data!
      expect(localSocietyMembership.id).toBe(societyMembershipForDelete.id)
      expect(localSocietyMembership.title).toBe(societyMembershipForDelete.title)
    })

    it('should delete societyMembership once only', async () => {
      const result = await adminTools.societyMembershipDeleteById(societyMembershipForDelete.id)
      expect(result.code).toBe(500)
      expect(result.isSuccess).toBe(false)
      expect(result.data!).toBe(null)
      expect(result.errorMessage).toMatch(/Failed to delete /)
    })

    it('societyMembership create error', async () => {
      let dummy: Partial<SocietyMembershipCreateInput> = {
        title: 'test society 3',
      }
      expect(
        adminTools.societyCreate(dummy as any)
      ).rejects.toThrowError(/ error. /)
    })


    
    // SocietyMember
    let societyMemberPermenant:SocietyMember
    let societyMemberYear:SocietyMember
    let societyMemberDedicate:SocietyMember
    let societyMemberForDelete:SocietyMember

    it('should return a PERMANENT societyMember', async () => {
      let dummySocietyMemberInput: SocietyMemberCreateInput = {
        societyId: societySingleU.id,
        userId: userA.id,
        userEmail: userA.email!,
        status: SocietyMemberStatus.ACTIVE,
        roles: [SocietyMemberRole.USER],
        planType: SocietyMembershipPlanType.PERMANENT,
      }
      const result = await adminTools.societyMemberCreate(dummySocietyMemberInput)

      expect(result.code).toBe(200)
      expect(result.isSuccess).toBe(true)
      expect(result.errorMessage).toBe(null)
      societyMemberPermenant = result.data!
      expect(societyMemberPermenant.societyId).toBe(dummySocietyMemberInput.societyId)
      expect(societyMemberPermenant.userId).toBe(dummySocietyMemberInput.userId)
      expect(societyMemberPermenant.userEmail).toBe(dummySocietyMemberInput.userEmail)
      expect(societyMemberPermenant.societyId).toBe(dummySocietyMemberInput.societyId)
      expect(societyMemberPermenant.roles).toContain(SocietyMemberRole.USER)
      expect(societyMemberPermenant.planType).toBe(SocietyMembershipPlanType.PERMANENT)
      expect(societyMemberPermenant.planEndDate).toBe(null)
    })

    it('should return a YEAR societyMember', async () => {
      let dummySocietyMemberInput: SocietyMemberCreateInput = {
        societyId: societySingleU.id,
        userId: userB.id,
        userEmail: userB.email!,
        status: SocietyMemberStatus.ACTIVE,
        roles: [SocietyMemberRole.USER],
        planType: SocietyMembershipPlanType.YEAR,
        planEndDate:new Date().toISOString()
      }
      const result = await adminTools.societyMemberCreate(dummySocietyMemberInput)

      expect(result.code).toBe(200)
      expect(result.isSuccess).toBe(true)
      expect(result.errorMessage).toBe(null)
      societyMemberYear = result.data!
      expect(societyMemberYear.societyId).toBe(dummySocietyMemberInput.societyId)
      expect(societyMemberYear.userId).toBe(dummySocietyMemberInput.userId)
      expect(societyMemberYear.userEmail).toBe(dummySocietyMemberInput.userEmail)
      expect(societyMemberYear.societyId).toBe(dummySocietyMemberInput.societyId)
      expect(societyMemberYear.roles).toContain(SocietyMemberRole.USER)
      expect(societyMemberYear.planType).toBe(SocietyMembershipPlanType.YEAR,)
      expect(societyMemberYear.planEndDate).toBe(dummySocietyMemberInput.planEndDate)
    })

    it('should return a DEDICATED societyMember', async () => {
      let dummySocietyMemberInput: SocietyMemberCreateInput = {
        societyId: societySingleU.id,
        userId: userC.id,
        userEmail: userC.email!,
        status: SocietyMemberStatus.ACTIVE,
        roles: [SocietyMemberRole.USER],
        planType: SocietyMembershipPlanType.DEDICATED,
        planEndDate:new Date().toISOString()
      }
      const result = await adminTools.societyMemberCreate(dummySocietyMemberInput)

      expect(result.code).toBe(200)
      expect(result.isSuccess).toBe(true)
      expect(result.errorMessage).toBe(null)
      societyMemberDedicate = result.data!
      expect(societyMemberDedicate.societyId).toBe(dummySocietyMemberInput.societyId)
      expect(societyMemberDedicate.userId).toBe(dummySocietyMemberInput.userId)
      expect(societyMemberDedicate.userEmail).toBe(dummySocietyMemberInput.userEmail)
      expect(societyMemberDedicate.societyId).toBe(dummySocietyMemberInput.societyId)
      expect(societyMemberDedicate.roles).toContain(SocietyMemberRole.USER)
      expect(societyMemberDedicate.planType).toBe(SocietyMembershipPlanType.DEDICATED,)
      expect(societyMemberDedicate.planEndDate).toBe(dummySocietyMemberInput.planEndDate)
    })

    it('should return a TO DELETE societyMember', async () => {
      let dummySocietyMemberInput: SocietyMemberCreateInput = {
        societyId: societyPublic.id,
        userId: userA.id,
        userEmail: userA.email!,
        status: SocietyMemberStatus.ACTIVE,
        roles: [SocietyMemberRole.USER],
        planType: SocietyMembershipPlanType.DEDICATED,
        planEndDate:new Date().toISOString()
      }
      const result = await adminTools.societyMemberCreate(dummySocietyMemberInput)

      expect(result.code).toBe(200)
      societyMemberForDelete = result.data!
    })

    it('should delete societyMember', async () => {
      const result = await adminTools.societyMemberDeleteById(societyMemberForDelete.id)
      expect(result.code).toBe(200)
      expect(result.isSuccess).toBe(true)
      expect(result.errorMessage).toBe(null)
      const localSocietyMember = result.data!
      expect(localSocietyMember.id).toBe(societyMemberForDelete.id)
    })

    it('should delete societyMember once only', async () => {
      const result = await adminTools.societyMemberDeleteById(societyMemberForDelete.id)
      expect(result.code).toBe(500)
      expect(result.isSuccess).toBe(false)
      expect(result.data!).toBe(null)
      expect(result.errorMessage).toMatch(/Failed to delete /)
    })

    it('societyMember create error', async () => {
      let dummy: Partial<SocietyMemberCreateInput> = {
        userId:""
      }
      expect(
        adminTools.societyCreate(dummy as any)
      ).rejects.toThrowError(/ error. /)
    })
  })

  describe('Society Mangement Domain Test', () => {

  })

  afterAll(async () => {
    await app.close()
  })
})
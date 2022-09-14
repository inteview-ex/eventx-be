import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IDGenerator } from 'src/utils/idGenerator'
import { IsDefinedNotNull } from 'src/utils/isDefinedNotNull'
import { IsObjectEmpty } from 'src/utils/isObjectEmpty'
import { NewWhere } from 'src/utils/newWhereOrderType/type'
import {
  getPagination,
  getPaginationOutput,
} from 'src/utils/pagination/pagination'
import {
  defaultResponseFormat,
  ResponseFormat,
} from 'src/utils/responseFormat/responseFormat'
import { MongoRepository } from 'typeorm'
import { CryptoInfoCreateInput } from './dto/crypto-info-create.input'
import { CryptoInfoFilterInput } from './dto/crypto-info-filter.input'
import { CryptoInfoUpdateInput } from './dto/crypto-info-update.input'
import { CryptoInfo } from './crypto-info.entity'

@Injectable()
export class CryptoInfoService {
  constructor(
    @InjectRepository(CryptoInfo)
    private readonly cryptoInfoRepository: MongoRepository<CryptoInfo>
  ) {}

  async cryptoInfoGetById(id: string): Promise<ResponseFormat<CryptoInfo>> {
    const defaultRes: ResponseFormat<CryptoInfo> = {
      ...defaultResponseFormat,
    }
    const found = await this.cryptoInfoRepository.findOne({ id })
    if (!found) {
      defaultRes.code = 404
      return defaultRes
    }
    defaultRes.isSuccess = true
    defaultRes.data = found
    return defaultRes
  }

  async cryptoInfosGetAll(
    cryptoInfoFilterInput?: CryptoInfoFilterInput
  ): Promise<ResponseFormat<CryptoInfo[]>> {
    const defaultRes: ResponseFormat<CryptoInfo[]> = {
      ...defaultResponseFormat,
    }
    const newWhere: NewWhere<CryptoInfo> = {}
    try {
      if (
        cryptoInfoFilterInput &&
        !IsObjectEmpty({ ...cryptoInfoFilterInput })
      ) {
        // if (cryptoInfoFilterInput.cryptoInfoIds) {
        //   newWhere.id = {
        //     $in: cryptoInfoFilterInput.cryptoInfoIds,
        //   }
        // }
        // if (cryptoInfoFilterInput.societyIds) {
        //   newWhere.societyId = {
        //     $in: cryptoInfoFilterInput.societyIds,
        //   }
        // }
        // if (cryptoInfoFilterInput.societyId) {
        //   newWhere.societyId = cryptoInfoFilterInput.societyId
        // }
        // if (cryptoInfoFilterInput.statuses) {
        //   newWhere.status = {
        //     $in: cryptoInfoFilterInput.statuses,
        //   }
        // }
        // if (cryptoInfoFilterInput.types) {
        //   newWhere.type = {
        //     $in: cryptoInfoFilterInput.types,
        //   }
        // }
      }

      const pagination = getPagination(cryptoInfoFilterInput.pagination)
      const result = await this.cryptoInfoRepository.findAndCount({
        where: newWhere,
        order: {
          updateAt: 'ASC',
        },
        skip: pagination.skip,
        take: pagination.take,
      })
      defaultRes.isSuccess = true
      // defaultRes.data = finalResult
      defaultRes.pagination = getPaginationOutput(pagination, result[1])
      defaultRes.data = result[0]
    } catch (error) {
      console.log('error', error)
      defaultRes.code = 500
      defaultRes.errorMessage = 'Failed to filter SocietyMember. DB error.'
    }
    return defaultRes
  }

  async cryptoInfoDeleteById(id: string): Promise<ResponseFormat<CryptoInfo>> {
    const defaultRes: ResponseFormat<CryptoInfo> = {
      ...defaultResponseFormat,
    }
    const result = await this.cryptoInfoRepository.findOneAndDelete({
      id,
    })
    if (result.value) {
      defaultRes.isSuccess = true
      defaultRes.data = result.value
    } else {
      defaultRes.code = 500
      defaultRes.errorMessage = 'Failed to delete cryptoInfo'
    }
    return defaultRes
  }

  async cryptoInfoCreate(
    cryptoInfoCreateInput: CryptoInfoCreateInput
  ): Promise<ResponseFormat<CryptoInfo>> {
    const defaultRes: ResponseFormat<CryptoInfo> = {
      ...defaultResponseFormat,
    }
    // const {
    //   title,
    //   societyId,
    //   instruction,
    //   status,
    //   type,
    // } = cryptoInfoCreateInput
    // try {
    //   if (!IsDefinedNotNull(societyId)) {
    //     throw new BadRequestException('societyId cannot be empty')
    //   }
    //   const newCryptoInfo = new CryptoInfo({
    //     id: IDGenerator(),
    //     societyId,
    //     title,
    //     instruction,
    //     status,
    //     type,
    //   })
    //   // const { isValid, errMessage } =
    //   //   this._cryptoInfoPlanCheck(newCryptoInfo)
    //   // if (!isValid) {
    //   //   throw new Error(errMessage)
    //   // }
    //   const result = await this.cryptoInfoRepository.save(
    //     newCryptoInfo
    //   )
    //   defaultRes.isSuccess = true
    //   defaultRes.data = result
    // } catch (error) {
    //   defaultRes.code = 500
    //   defaultRes.errorMessage = `Fail to create cryptoInfo. Error: ${error.message}`
    // }
    return defaultRes
  }
  async cryptoInfoUpdateById(
    cryptoInfoUpdateInput: CryptoInfoUpdateInput
  ): Promise<ResponseFormat<CryptoInfo>> {
    const defaultRes: ResponseFormat<CryptoInfo> = {
      ...defaultResponseFormat,
    }
    // const {
    //   title,
    //   cryptoInfoId,
    //   status,
    //   instruction
    // } =
    //   // userId, userEmail, societyId,
    //   cryptoInfoUpdateInput
    // try {
    //   const found = await this.cryptoInfoRepository.findOne({
    //     id: cryptoInfoId,
    //   })
    //   if (!found) {
    //     defaultRes.code = 404
    //     defaultRes.errorMessage =
    //       'Failed to Update CryptoInfoTier. CryptoInfoTier not found.'
    //     return defaultRes
    //   }

    //   // found.title = title ?? found.title
    //   // found.status = status ?? found.status
    //   // found.instruction = instruction ?? found.instruction
    //   const result = await this.cryptoInfoRepository.save(found)
    //   defaultRes.isSuccess = true
    //   defaultRes.data = result
    // } catch (error) {
    //   defaultRes.code = 500
    //   defaultRes.errorMessage = 'Fail to update cryptoInfo'
    // }
    return defaultRes
  }

  async testWrite() {
    const newCryptoInfo = new CryptoInfo({
      id:'BTC',
      currency: 'BTC',
      symbol: 'BTC',
      name: 'Bitcoin',
      logo_url:
        'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/btc.svg',
      price: '22330.35490444',
      '1d': {
        volume: '13224806394351.69',
        price_change: '-25067.82312619',
        price_change_pct: '-0.5291',
        volume_change: '-5808843703215.91',
        volume_change_pct: '-0.3052',
        market_cap_change: '-468982002372.49',
        market_cap_change_pct: '-0.5233',
      },
    })
    const createResult = await this.cryptoInfoRepository.save(newCryptoInfo)
    console.log('testWrite', createResult)
  }

  async testRead() {
    const results = await this.cryptoInfoRepository.find()
    console.log('testRead', results)
    return results
  }
}

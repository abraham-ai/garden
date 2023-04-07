import type Creation from './Creation'

interface CreationSocialTypes {
  layout: string
  reactionCountList: {
    praises: number
    praised: boolean
    burns: number
    burned: boolean
  }
  creation: [Creation]
  creationId: string
}

export default CreationSocialTypes

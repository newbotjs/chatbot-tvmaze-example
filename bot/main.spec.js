import assert from 'assert'
import {
    ConverseTesting
} from 'newbot/testing'
import mainSkill from './main'

describe('Main Skill Test', () => {
    let userConverse, converse

    beforeEach(() => {
        converse = new ConverseTesting(mainSkill)
        userConverse = converse.createUser({
            session: {
                message: {
                    source: 'website'
                }
            }
        })
    })

    it('Test Quick Replies', () => {
        return userConverse
            .start(testing => {
                const {
                    actions
                } = testing.output(0)
                assert.deepEqual(actions, ['search series'])
            }).end()
    })
})
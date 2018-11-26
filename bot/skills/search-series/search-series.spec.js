import assert from 'assert'
import {
    ConverseTesting
} from 'newbot/testing'
import seriesSkill from './search-series'

describe('Search Serie Skill Test', () => {
    let userConverse, converse

    const data = [
        {
            show: {
                name: 'Test',
                image: {
                    original: 'http://example.com/test.png'
                },
                summary: '<p>Summary</p>',
                url: 'http://example.com/url.html'
            }
        }
    ]

    beforeEach(() => {
        converse = new ConverseTesting(seriesSkill)
        converse.mock('Request', (url) => {
            return {
                data
            }
        })
        converse.nlp('testing', {
            'natural.intent.search'(str) {
                if ('search series girls' == str) return {
                    title: {
                        found: true,
                        value: data.map(d => d.show)
                    }
                }
                if ('search series' == str) return {
                    title: {
                        found: false
                    }
                }
                return false
            }
        })
        userConverse = converse.createUser({
            session: {
                message: {
                    source: 'website'
                }
            }
        })
    })

    const commonTest = (testing) => {
        const { text, cards } = testing.output(0)
        assert.equal(text, 'I found')
        assert.deepEqual(cards, [{
            title: 'Test',
            image: 'http://example.com/test.png',
            subtitle: 'Summary',
            buttons: [{
                url: 'http://example.com/url.html',
                title: 'View',
                type: 'web_url'                    
            }]
        }])
    }

    it('Test Search without keywords', () => {
        return userConverse
            .prompt('search series', testing => {
                assert.equal(testing.output(0), 'Ok, what is the name of the series?')
            })
            .prompt('girls', commonTest)
            .end()
    })

    it('Test Search with keywords', () => {
        return userConverse
            .prompt('search series girls', commonTest)
            .end()
    })
})
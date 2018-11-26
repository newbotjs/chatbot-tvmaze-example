import formats from 'newbot-formats'
import code from './main.converse'
import searchSeriesSkill from './skills/search-series/search-series'

export default {
    code,
    skills: {
        formats, 
        searchSeriesSkill 
    }
}
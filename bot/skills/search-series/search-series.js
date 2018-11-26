import striptags from 'striptags'
import formats from 'newbot-formats'
import code from './search-series.converse'

export default {
    code,
    skills: {
        formats
    },
    functions: {
        searchSeries(shows) {
            return shows.map(show => {
                if (show.show) {
                    show = show.show
                }
                return {
                    title: show.name,
                    image: show.image.original,
                    subtitle: striptags(show.summary),
                    buttons: [{
                        url: show.url,
                        title: 'View'
                    }]
                }
            })
        }
    }
}
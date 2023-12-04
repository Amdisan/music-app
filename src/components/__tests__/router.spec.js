import { RouterLinkStub, shallowMount } from '@vue/test-utils'
import SongItem from '../SongItem.vue'

describe('Router', () => {
  test('renders router link', () => {
    const song = {
      docID: 'abc'
    }

    const wrapper = shallowMount(SongItem, {
      propsData: { song },
      global: {
        components: {
          RouterLink: RouterLinkStub //must 'RouterLink' - like in SongItem not 'router-link'
        }
      }
    })

    expect(wrapper.findComponent(RouterLinkStub).props().to).toEqual({
      name: 'song',
      params: { id: song.docID }
    })
  })
})

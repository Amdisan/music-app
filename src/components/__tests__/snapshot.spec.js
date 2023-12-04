import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import SongItem from '../SongItem.vue'
import { expect } from 'vitest'

describe('Snapshot SongItem.vue', () => {
  test('renders correctly', () => {
    const song = {
      docID: 'abc',
      modified_name: 'test',
      display_name: 'test',
      comment_count: 5
    }

    const wrapper = shallowMount(SongItem, {
      propsData: { song },
      globals: {
        components: {
          'router-link': RouterLinkStub
        }
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})

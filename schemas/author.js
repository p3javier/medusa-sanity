import {JsonView} from '../components/views/JsonView'
import {DocumentIcon } from '@sanity/icons'
import S from '@sanity/desk-tool/structure-builder'
import humanIcon from '../components/icons/humanIcon'

export default {
  name: 'author',
  type: 'document',
  title: 'Autor',
  views: [
    S.view.component(JsonView).title('JSON').icon(DocumentIcon),
  ],
  icon: humanIcon,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Nombre',
    },
    {
      name: 'picture',
      title: 'Foto',
      type: 'image',
      options: {
        hotspot: true, // <-- Defaults to false
      },
      fields: [
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
          options: {
            isHighlighted: true, // <-- make this field easily accessible
          },
        },
      ],
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [{type: 'block'}],
    },
  ],
}

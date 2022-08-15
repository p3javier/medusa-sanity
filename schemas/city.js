import cityIcon from '../components/icons/cityIcon';
export default {

    name: 'city',
    type: 'document',
      title: 'Ciudad',
    fields: [
      {
        name: 'name',
        type: 'string',
        title: 'Name'
      },
      {
        name: 'description',
        title: 'Description',
        type: 'array',
        of: [{type: 'block'}],
      },
      {
        name: 'services',
        title: 'Servicios',
        type: 'array',
        of: [{
          type: 'reference',
          to: [{ type: 'service'}]
        }]
      }
    ],
    icon: cityIcon
  }
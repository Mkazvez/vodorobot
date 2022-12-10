export const navigation = [
  {
    text: 'Home',
    path: '/home',
    icon: 'home'
  },
  {
    text: 'Отчеты',
    icon: 'copy',
    items: [
      {
        text: 'Статус (сведения) станций',
        path: '/status'
      },
      {
        text: 'Трафик',
        path: '/traffic'
      },
      {
        text: 'Чаевые',
        path: '/tips'
      },
      {
        text: 'Продажи',
        path: '/sales'
      },
      {
        text: 'Температура',
        path: '/temperature'
      },
      {
        text: 'Покупатели',
        path: '/buyer'
      }
    ]
  },
  {
    text: 'Справочники',
    icon: 'textdocument',
    items: [
      {
        text: 'Сотрудники',
        path: '/users'
      },
      {
        text: 'Реестр станций',
        path: '/station'
      },
      {
        text: 'Владельцы станций',
        path: '/ownerstation'
      }
    ]
  },
  {
    text: 'Настройки',
    icon: 'preferences',
    items: [
      {
        text: 'Ключи станций',
        path: '/ikey'
      },
      {
        text: 'Настройка станций',
        path: '/setting'
      },
      {
        text: 'Настройки цен',
        path: '/setupstation'
      },
      {
        text: 'Реестр тех.обслуживание',
        path: '/maintenance'
      },
      {
        text: 'Инкассация',
        path: '/collection'
      }
    ]
  }
  ];

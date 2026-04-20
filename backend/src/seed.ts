import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Clearing database...')

  // Delete all users
  await prisma.user.deleteMany()
  // Delete all questions
  await prisma.question.deleteMany()
  // Delete all categories
  await prisma.category.deleteMany()

  console.log('Seeding new categories and questions...')

  const htmlCss = await prisma.category.create({
    data: {
      slug: 'html-css',
      name_en: 'HTML & CSS',
      name_ua: 'HTML та CSS',
      icon: 'Layout',
      order: 1
    }
  })

  const jsTs = await prisma.category.create({
    data: {
      slug: 'js-ts',
      name_en: 'JavaScript / TypeScript',
      name_ua: 'JavaScript / TypeScript',
      icon: 'Code',
      order: 2
    }
  })

  const react = await prisma.category.create({
    data: {
      slug: 'react',
      name_en: 'React & Next.js',
      name_ua: 'React та Next.js',
      icon: 'Atom',
      order: 3
    }
  })

  await prisma.question.createMany({
    data: [
      {
        category_id: htmlCss.id,
        question_en: 'What is the "box model" in CSS?',
        question_ua: 'Що таке "блокова модель" (box model) в CSS?',
        answer_en:
          'The CSS box model is essentially a box that wraps around every HTML element. It consists of: margins, borders, padding, and the actual content.',
        answer_ua:
          'Блокова модель CSS — це контейнер, який обгортає кожен HTML-елемент. Вона складається з полів (margin), границь (border), відступів (padding) і самого контенту.',
        difficulty: 'easy',
        order: 1
      },
      {
        category_id: htmlCss.id,
        question_en: 'What is the difference between display: none and visibility: hidden?',
        question_ua: 'Яка різниця між display: none та visibility: hidden?',
        answer_en:
          'display: none removes the element from the normal document flow, freeing up the space it occupied. visibility: hidden merely hides the element, leaving the space it takes up blank.',
        answer_ua:
          'display: none видаляє елемент зі звичайного потоку документа, вивільняючи місце, яке він займав. visibility: hidden просто приховує елемент, залишаючи порожнє місце, яке він займає.',
        difficulty: 'easy',
        order: 2
      },
      {
        category_id: jsTs.id,
        question_en: 'Explain closures in JavaScript',
        question_ua: 'Поясніть замикання (closures) в JavaScript',
        answer_en:
          "A closure is the combination of a function bundled together (enclosed) with references to its lexical environment. In other words, a closure gives you access to an outer function's scope from an inner function.",
        answer_ua:
          'Замикання — це комбінація функції та лексичного середовища, в якому ця функція була заявлена. Іншими словами, замикання дає вам доступ до області видимості зовнішньої функції з внутрішньої функції.',
        difficulty: 'medium',
        order: 1
      },
      {
        category_id: jsTs.id,
        question_en: 'What is Event Delegation?',
        question_ua: 'Що таке делегування подій (Event Delegation)?',
        answer_en:
          'Event delegation is a technique involving adding event listeners to a parent element instead of adding them to the descendant elements. The listener will fire whenever the event is triggered on the descendant elements due to event bubbling up the DOM.',
        answer_ua:
          'Делегування подій — це техніка, яка передбачає додавання обробників подій до батьківського елемента замість додавання їх до елементів-нащадків. Обробник спрацьовуватиме кожного разу, коли подія ініціюється на елементах-нащадках через спливання (bubbling) події в DOM.',
        difficulty: 'hard',
        order: 2
      },
      {
        category_id: react.id,
        question_en: 'What is the Virtual DOM?',
        question_ua: 'Що таке Virtual DOM?',
        answer_en:
          'The virtual DOM is a programming concept where an ideal, or "virtual", representation of a UI is kept in memory and synced with the "real" DOM by a library such as ReactDOM.',
        answer_ua:
          'Віртуальний DOM - це концепція програмування, в якій ідеальне або віртуальне представлення UI зберігається в пам\'яті і синхронізується з "реальним" DOM.',
        difficulty: 'medium',
        order: 1
      },
      {
        category_id: react.id,
        question_en: 'Explain the useEffect hook in React',
        question_ua: 'Поясніть як працює useEffect в React',
        answer_en:
          'The useEffect hook lets you perform side effects in function components. It works similarly to componentDidMount, componentDidUpdate, and componentWillUnmount in React classes combined.',
        answer_ua:
          'Хук useEffect дозволяє виконувати побічні ефекти (side effects) у функціональних компонентах. Він працює подібно до componentDidMount, componentDidUpdate та componentWillUnmount у класових компонентах React разом узятих.',
        difficulty: 'easy',
        order: 2
      }
    ]
  })

  console.log('Database seeded with new categories and questions!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

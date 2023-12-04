export default {
  beforeMount(el, binding) {
    let iconClass = `fa fa-${binding.value} text-xl`

    if (binding.arg === 'full') {
      iconClass = binding.value
    }

    if (binding.modifiers.right) {
      iconClass += ' float-right' //need add space before class or this will not work
    }

    if (binding.modifiers.yellow) {
      iconClass += ' text-yellow-400' //need add space before class or this will not work
    } else {
      iconClass += ' text-green-400' //need add space before class or this will not work
    }

    el.innerHTML += `<i class="${iconClass}"></i>`
  }
}

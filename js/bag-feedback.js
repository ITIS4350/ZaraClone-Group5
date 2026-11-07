// loading for adding to bag doesnt do anything just a fake loading screen 
const BagFeedback = (() => {
  const dialog = document.createElement('dialog');
  dialog.className = 'bag-feedback';
  dialog.setAttribute('aria-labelledby', 'bag-feedback-title');
  dialog.setAttribute('aria-describedby', 'bag-feedback-item');
 // adds the diolog to the body and sets up the inner HTML for the dialog, including a close button, spinner, status message, and actions for viewing the bag or continuing shopping
  dialog.innerHTML = `
    <button class="bag-feedback-close" type="button" aria-label="Close bag popup">&times;</button>
    <span class="bag-feedback-spinner" aria-hidden="true"></span>
    <div role="status" aria-live="polite" aria-atomic="true">
      <h2 id="bag-feedback-title" tabindex="-1"></h2>
    </div>
    <p id="bag-feedback-item"></p>
    <div class="bag-feedback-actions" hidden>
      <a href="bag_page.html">View bag</a>
      <button type="button">Continue shopping</button>
    </div>`;
  document.body.append(dialog);
  //Caches child DOM elements for later use to avoid repeated DOM queries
  const title = dialog.querySelector('h2');
  const item = dialog.querySelector('#bag-feedback-item');
  const spinner = dialog.querySelector('.bag-feedback-spinner');
  const actions = dialog.querySelector('.bag-feedback-actions');
  const bagLink = actions.querySelector('a');
  let timer;
  let opener;
  let submit;

  // will re-enable the submit button and remove the aria-busy attribute after the fake loading is done
  function releaseButton() {
    submit.disabled = false;
    submit.removeAttribute('aria-busy');
  }

  // prevents the dialog from closing if the user clicks the "Continue shopping" button while the fake loading is still happening
  function close() {
    clearTimeout(timer);
    releaseButton();
    dialog.close();
  }
  dialog.querySelector('.bag-feedback-close').addEventListener('click', close);
  actions.querySelector('button').addEventListener('click', close);
  dialog.addEventListener('cancel', event => {
    event.preventDefault();
    close();
  });
  dialog.addEventListener('close', () => opener?.focus());

  function add(product, selection, button, returnFocus = button) {
    if (dialog.open) {
      return;
    }
    opener = returnFocus;
    submit = button;
    submit.disabled = true;
    submit.setAttribute('aria-busy', 'true');
    spinner.hidden = false;
    actions.hidden = true;
    bagLink.hidden = true;
    title.textContent = 'Adding to bag…';
    item.textContent = product.name + ' · ' + selection.color + ' · Size ' + selection.size;
    dialog.showModal();
    title.focus();

    // purley simulated since theres nothing actually occuring in the backround 
    timer = setTimeout(() => {
      try {
        Cart.addItem(selection);
        title.textContent = Cart.storageAvailable
          ? 'Added to your bag'
          : 'Bag not saved. Please allow site storage.';
        bagLink.hidden = !Cart.storageAvailable;
      } catch {
        title.textContent = 'Could not add this item. Please try again.';
      } finally {
        spinner.hidden = true;
        actions.hidden = false;
        releaseButton();
      }
    }, 700);
  }

  return { add, get open() { return dialog.open; } };
})();

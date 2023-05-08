// @ts-nocheck
import { Controller } from '@hotwired/stimulus';

// Connects to data-controller="search"
export default class extends Controller {
  // define your targets on the page
  static targets = ['input', 'suggestions'];

  connect() {
    document.addEventListener('click', (event) => {
      if (!this.element.contains(event.target)) {
        this.hideSuggestions();
      }
    });
  }

  //call the suggestions action defined in the form
  suggestions() {
    const query = this.inputTarget.value;
    const url = this.element.dataset.suggestionsUrl;

    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.requestSuggestions(query, url);
    }, 250);
  }

  requestSuggestions(query, url) {
    if (query.length === 0) {
      this.hideSuggestions();
      return;
    }
    this.showSuggestions();

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'X-CSRF-Token': document.querySelector("meta[name='csrf-token']")
          .content,
      },
      body: JSON.stringify({ query: query }),
    }).then((response) => {
      response.text().then((html) => {
        document.body.insertAdjacentHTML('beforeend', html);
      });
    });
  }

  childClicked(event) {
    this.childWasClicked = this.element.contains(event.target);
  }

  showSuggestions() {
    this.suggestionsTarget.classList.remove('hidden');
  }

  hideSuggestions() {
    if (!this.childWasClicked) {
      this.suggestionsTarget.classList.add('hidden');
    }
    this.childWasClicked = false;
  }
}

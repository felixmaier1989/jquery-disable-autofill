# jquery-disable-autofill
jQuery plugin to disable autofill on Safari. 

## Why disabling Safari's autofill?

If you want to implement jQuery's autocomplete, you may have some troubles on Safari. Safari's autofill would trigger, regardless of your input's `autocomplete="off"` attribute. After investigation I could evaluate that Safari's decision to enable autofill relies on the following factors:

* Does the "id" attribute of the input contain "name"?
* Does the "name" attribute of the input contain "name"?
* Does the label of the input contain "name"?

This plugin will make sure your input will not match these conditions anymore.

## How to use it ##

```html
<script src="path/to/jquery-disableAutofill.js"></script>
```

```javascript
$(document).ready(function () {
	$('input').disableAutoFill();
});
```

/*!
 * Copyright 2016 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* (function () {
	"use strict";
	var workerScript = document.currentScript && document.currentScript.dataset.serviceWorker;
	if (workerScript && 'serviceWorker' in navigator) {
		navigator.serviceWorker.register(workerScript);
	}
})(); */
if ("serviceWorker" in navigator) {
	/* navigator.serviceWorker.getRegistrations().then(function (registrations) {
		"use strict";
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError;
		var _iterator;
		var _step;
		try {
			for (_iterator = registrations[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var registration = _step.value;
				registration.unregister();
				console.log("Unregistered Service Worker", registration.scope);
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		}
		finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return ) {
					_iterator.return ();
				}
			}
			finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}
	}); */
	var workerScript = document.currentScript && document.currentScript.dataset.serviceWorker;
	if (workerScript) {
		navigator.serviceWorker.register(workerScript);
		console.log("Registered Service Worker", workerScript);
	}
}

// ==UserScript==
// @name        Deleted answer message
// @description Adds message if a linked answer was deleted
// @match       *://*.askubuntu.com/*
// @match       *://*.mathoverflow.net/*
// @match       *://*.serverfault.com/*
// @match       *://*.stackapps.com/*
// @match       *://*.stackexchange.com/*
// @match       *://*.stackoverflow.com/*
// @match       *://*.superuser.com/*
// @exclude     *://*.stackexchange.com/election/*
// @exclude     *://*.stackoverflow.com/election/*
// @exclude     *://stackoverflow.com/election/*
// @exclude     *://api.stackexchange.com/*
// @exclude     *://blog.stackexchange.com/*
// @exclude     *://blog.stackoverflow.com/*
// @exclude     *://chat.stackexchange.com/*
// @exclude     *://data.stackexchange.com/*
// @exclude     *://elections.stackexchange.com/*
// @exclude     *://openid.stackexchange.com/*
// @exclude     *://stackexchange.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @noframes
// @version     1.0
// @author      fastnlight
// ==/UserScript==
/* global $ */
/* eslint-disable no-multi-spaces, curly */
(function() {
    'use strict';

    // Create the popup HTML structure
    var popupHtml = `
        <div id="popup" class="popup">
            <div class="popup-content">
                <p class="noBottomP">Answer deleted</p>
            </div>
        </div>
    `;

    // Append the popup to the body
    document.body.insertAdjacentHTML('beforeend', popupHtml);

    // CSS styles
    var style = document.createElement('style');
    style.innerHTML = `
    #popup {
    display: none;
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #ff5757;
    color: #fff;
    padding: 5px;
    border-radius: 5px;
    animation: fadeIn 0.5s ease-in-out;
    z-index: 9999;
    width: auto;
    height: auto;
    max-width: 80%;
    max-height: 80vh;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes fadeOut {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}

#popup .popup-content {
    text-align: center;
}

.noBottomP {
    margin-bottom: 0 !important;
    font-size: 15px;
}

    `;
    document.head.appendChild(style);

    // JavaScript functions
    window.showPopup = function() {
        var popup = document.getElementById("popup");
        popup.style.display = "block";
    };

    window.closePopup = function() {
        var popup = document.getElementById("popup");
        popup.style.animation = "fadeOut 0.5s ease-in-out";
        setTimeout(() => {
            popup.style.display = "none";
            popup.style.animation = "none"; // Reset animation
        }, 500);
    };
    var qstMtch = location.pathname.match (/\/questions\/(\d+)\/.+?\/(\d+)\/?$/);
    if (qstMtch  &&  qstMtch.length > 2) {
        var ansId   = qstMtch[2];
        var ansPost = $("#answer-" + ansId);
        if (ansPost.length === 0) {
            showPopup();
        }
    }
})();
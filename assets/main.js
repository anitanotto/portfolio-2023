//Close
const closeButtons = document.querySelectorAll(".close");

for (const button of closeButtons) {
  button.addEventListener("click", function () {
    button.parentNode.parentNode.parentNode.classList.add("hidden");
  });
}

//Drag n Drop
const windows = document.querySelectorAll(".title-bar");

for (const bar of windows) {
  bar.onmousedown = function (event) {
    if (event.button === 0 && event.target.nodeName !== "BUTTON") {
      event.preventDefault()
      const iframes = document.querySelectorAll('iframe')
      iframes.forEach(e => e.style.pointerEvents = 'none')
      // (1) prepare to moving: make absolute and on top by z-index
      bar.parentNode.style.position = "absolute";
      bar.parentNode.style.zIndex = 1000;

      // move it out of any current parents directly into body
      // to make it positioned relative to the body
      document.body.append(bar.parentNode);

      // centers the ball at (pageX, pageY) coordinates
      function moveAt(pageX, pageY) {
        bar.parentNode.style.left = pageX - bar.offsetWidth / 2 + "px";
        bar.parentNode.style.top = pageY - (bar.offsetHeight / 2) + "px";
      }

      // move our absolutely positioned ball under the pointer
      moveAt(event.pageX, event.pageY);

      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
      }

      // (2) move the ball on mousemove
      document.addEventListener("mousemove", onMouseMove);

      // (3) drop the ball, remove unneeded handlers
      bar.onmouseup = function (event) {

        bar.parentNode.style.position = "fixed";
        //bar.parentNode.style.left = event.pageX - bar.offsetWidth / 2 + "px";
        let targetY = event.screenY - (window.screen.availHeight - window.innerHeight)

        bar.parentNode.style.top = targetY - (bar.offsetHeight / 2 - 4) + "px";
          
        document.removeEventListener("mousemove", onMouseMove);
        iframes.forEach(e => e.style.pointerEvents = 'auto')
        bar.onmouseup = null;
      };
    }

    bar.ondragstart = function () {
      return false;
    };
  };
}

//Yuk
const yuk = document.querySelector("#yukButton");

yuk.addEventListener("click", disableAnimations);

function disableAnimations() {
  const targets = document.querySelectorAll("*");

  for (const target of targets) {
    target.classList.add("noanimation");
  }

  document.querySelector("body").classList.toggle('movingStars')
  document.querySelector("body").classList.toggle('stillStars')


  localStorage.setItem("yuk", "true");

  document.querySelector("#yukButton").style.display = "none";
  document.querySelector("#yumButton").style.display = "inline-block";
}

const yum = document.querySelector("#yumButton");

yum.addEventListener("click", enableAnimations);
window.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("yuk") === "true") {
    disableAnimations();
  }
});
function enableAnimations() {
  const targets = document.querySelectorAll("*");

  for (const target of targets) {
    target.classList.toggle("noanimation");
  }

  document.querySelector("body").classList.toggle('stillStars')
  document.querySelector("body").classList.toggle('movingStars')


  localStorage.setItem("yuk", "false");

  document.querySelector("#yukButton").style.display = "inline-block";
  document.querySelector("#yumButton").style.display = "none";
}

// Neco



class VirtualPet {
    constructor(moodId, hungerId, moneyId, textBoxId, text1Id, text2Id, controlsId, talkButton, feedButton, gambleButton, imgClass, moods, currentMood, mood, hunger, money) {
        this.moodId = moodId
        this.hungerId = hungerId
        this.moneyId = moneyId

        this.textBoxId = textBoxId
        this.text1Id = text1Id
        this.text2Id = text2Id
        
        this.controlsId = controlsId
        this.talkButton = talkButton
        this.feedButton = feedButton
        this.gambleButton = gambleButton

        const controls = document.querySelector(controlsId)
        controls.addEventListener('click', event => {
            if (event.target.id === talkButton) {
                this.talk()
            } else if (event.target.id === feedButton) {
                this.feed()
            } else if (event.target.id === gambleButton) {
                this.gamble()
            }
        } )

        this.imgClass = imgClass
        this.moods = moods
        this.currentMood = currentMood

        this.mood = mood 
        this.hunger = hunger
        this.money = money

        // Change to check for local storage
        this.setMood('pog')
        setInterval(this.timer.bind(this), "15000")

    }

    timer() {
        this.randomMood()

        if (Math.random() > 0.49) {
            this.setMoodVal(--this.mood)
            if (this.mood === 0) this.setMood('sad')
        }

        if (Math.random() > 0.49) {
            this.setHungerVal(--this.hunger)
            if (this.hunger === 0) this.setMood('shock')
        }

        this.setMoneyVal(++this.money)
    }

    talk() {
        this.randomMood()

        if (this.currentMood === 'laugh' && this.hunger < 3) {
            this.setHungerVal(++this.hunger)
        }
        const val = Math.random()
        console.log(val, val > 0.49)
        console.log('mood ' + this.mood)
        if ((val > 0.49) && (this.mood < 3)) {
            this.setMoodVal(++this.mood)
            let text = document.querySelector(this.text2Id).innerText
            text = `${text} (+1 🩷)`
            document.querySelector(this.text2Id).innerText = text
        }
    }

    feed() {
        if (this.hunger < 3 && this.money >= 5) {
            this.setMoneyVal(this.money - 5)
            this.setHungerVal(++this.hunger)
            this.setMood('eat')
        } else if (this.hunger >= 3) {
            this.setMood('chill')
            this.changeText1(`No thanks, I'm full.`)
            this.changeText2('(Hunger meter cannot exceed 3.)')
        } else {
            this.setMood('shock')
        }
    }

    gamble() {
        console.log('gamble wip')
        if (this.money > 4) {
            this.setMoneyVal(this.money - 5)

            const val = Math.random()
            if (val === 1) {
                this.setMoneyVal(this.money + 105)
                this.setMood('gaze')
                this.changeText1('Jackpot!')
                this.changeText2('(You won $100!!!)')
            } else if (val > 0.74) {
                this.setMoneyVal(this.money + 15)
                this.setMood('dance1')
                this.changeText1('Nice win!')
                this.changeText2('(You won $10!!)')
            } else if (val > 0.49) {
                this.setMoneyVal(this.money + 10)
                this.setMood('dance2')
                this.changeText1('Pretty good.')
                this.changeText2('(You won $5!)')
            } else if (val > 0.24) {
                this.setMoneyVal(this.money + 5)
                this.setMood('shrug')
                this.changeText1(`At least you didn't lose...`)
                this.changeText2('(You broke even.)')
            } else if (val !== 0) {
                this.setMood('rage')
                this.changeText1(`You know that's my food money, right?`)
                this.changeText2('(You lost $5.)')
            } else {
                this.setMoneyVal(0)
                this.setMood('spicy')
                this.changeText1('Why did you go all in!?')
                this.changeText2('(You lost everything...)')
            }
        } else {
            this.setMood('shock')
        }
    }

    randomMood() {
        const mood = Array.from(this.moods.keys())[Math.floor(Math.random()*19)]
        this.changeImg(mood)
        this.currentMood = mood
        this.changeText1(this.moods.get(mood).line1)
        this.changeText2(this.moods.get(mood).line2)
    }

    setMood(mood) {
        this.changeImg(mood)
        this.currentMood = mood
        this.changeText1(this.moods.get(mood).line1)
        this.changeText2(this.moods.get(mood).line2)
    }

    changeText1(newText) {
        document.querySelector(this.text1Id).innerText = newText
    }

    changeText2(newText) {
        document.querySelector(this.text2Id).innerText = newText
    }

    changeImg(mood) {
        document.querySelectorAll(this.imgClass).forEach(e => {
            if (e.id === mood) {
                e.classList.remove('hidden')
            } else {
                e.classList.add('hidden')
            }
        })
    }

    setMoodVal(val) {
        const mood = document.querySelector(this.moodId)
        this.mood = val > -1 ? val : 0
        mood.innerText = `Mood: ${'🩷'.repeat(this.mood)}`
        //localstorage
    }

    setHungerVal(val) {
        const hunger = document.querySelector(this.hungerId)
        this.hunger = val > -1 ? val : 0
        hunger.innerText = `Hunger: ${'🍔'.repeat(this.hunger)}`
    }

    setMoneyVal(val) {
        const money = document.querySelector(this.moneyId)
        this.money = val > -1 ? val : 0
        money.innerText = `$${val}`
    }

}

class Mood {
    constructor(id, line1, line2) {
        this.id = id
        this.line1 = line1
        this.line2 = line2
    }
}

const moods = new Map()
moods.set('dance1', new Mood('#dance1', 'Watch out!', "I'll surprise you."))
moods.set('dance2', new Mood('#dance2', "Do you think that as long as the present is fun, you", "don't need to think about the future, like me?"))
moods.set('dodge', new Mood('#dodge', "It's hard to be popular. I want to see what it feels like", 'to have my hand fall off signing many autographs.'))
moods.set('escape', new Mood('#escape', 'My tin can opening skills are so great,', 'the contents vanish with it.'))
moods.set('flip', new Mood('#flip', 'Forests of dried sardines and boats of canned cat', 'food... What a fantasti-cat world that would be.'))
moods.set('gaze', new Mood('#gaze', 'This spotlight blinds the eyes... I guess sunglasses', 'should be the first thing I use my paycheck on-nya.'))
moods.set('gendo', new Mood('#gendo', 'Hello. It is I, your reliable partner.', 'The elite cat, Neco-Arc.'))
moods.set('laugh', new Mood('#laugh', 'Hehe... thank you for the genuine respect.', 'Everything you say is so naturally tasty. (+1 🍔)'))
moods.set('look', new Mood('#look', "You know-nya, if we understand each other so" ,"much, we're just a step away from being friends."))
moods.set('noodle', new Mood('#noodle', 'We cats are whimsical beings.', 'The concept of the internet is too complex for us.'))
moods.set('run', new Mood('#run', 'Huh, you want me to get some hot tea? Okay, fine.', "I'll run over to the store and get a couple of drinks!"))
moods.set('smug', new Mood('#smug', "Oh, don't get excited over a webpage like this.", "You've still got a lot to learn, partner."))
moods.set('sus', new Mood('#sus', "Honestly, I'm starting to get worried about how the", 'Cat Kingdom is doing without me.'))
moods.set('think', new Mood('#think', 'So, this is a modern website...', "Simple floats don't cut it, huh?"))
moods.set('uppies', new Mood('#uppies', "It's a bit late now, but allow me to introduce myself.", "I'm Neco-Arc."))
moods.set('wink', new Mood('#wink', "See? I'm a good kitty! And I'm really cute, most of all.", 'And mighty and brave.'))
moods.set('what', new Mood('#what', '*meow* *meow*', 'My body is made of cats.'))
moods.set('chill', new Mood('#chill', "I'm relaxing under the heater stove right now.", "Could you get my afternoon tea ready?"))
moods.set('spicy', new Mood('#spicy', "I'm boiling over here!", 'My brain is boiling like a hot-pot in the winter!'))

//Fixed Moods
moods.set('pog', new Mood('#pog', "With a flash of lightning, the cat finally arrives!", 'Do not doubt your eyes! This is real.'))
moods.set('eat', new Mood('#eat', `I'd like my cat food cooked well-done, please.`, '(+1 🍔)'))
moods.set('shrug', new Mood('#shrug', 'shrug1', 'shrug2'))
moods.set('rage', new Mood('#rage', 'rage1', 'rage2'))
// Low mood
moods.set('sad', new Mood('#sad', "Ignore me for a decade, huh?!", "I'm no fancy wine to be put aside!"))
// Low hunger
moods.set('shock', new Mood('#shock', 'Better than shrimp but worse than crab. What do I', "mean? I'm guessing what you'll taste like."))

const neco = new VirtualPet('#necomood', '#necohunger', '#necomoney', '#necoText', '#necoText1', '#necoText2', '#necoButtons', 'necochat', 'necofeed', 'necogamble', '.neco', moods, moods.get('pog'), 3, 3, 5)

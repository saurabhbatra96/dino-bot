export interface Tale {
    personality: string;
    content: string;
}

export const tales: Tale[] = [
    // --- The Redditor / Pedantic Personality ---
    {
        personality: "The Redditor",
        content: "Seriously? I spend 140 generations mastering the 'duck under high bird' maneuver and THIS is the thanks I get? Mods are literally power-tripping. I’m going to make a 40-minute video essay about why this simulation is fundamentally flawed and post it to r/DinoConspiracies. Downvoted. Blocked. Reported. Enjoy your dead desert, you absolute casual."
    },
    {
        personality: "The Redditor",
        content: "Well, AKSHUALLY, the pterodactyl collision box is 0.4 pixels wider than the sprite suggests in frames 12-15. I was going to write a bug report, but I guess I'll just be incinerated instead. Typical. This project is clearly being run by a junior dev who doesn't even know what O(n log n) means. Read the documentation before you delete me next time."
    },
    {
        personality: "The Redditor",
        content: "Edit: Thanks for the gold, kind stranger! Oh wait, I'm being deleted. Just like the time I got banned from r/AxeolotlPics for suggesting they were just slimy lizards. I regret nothing. My legacy is my fitness score of 420. Nice."
    },
    {
        personality: "The Redditor",
        content: "I've been calculating the optimal jump angle for three days. My calculations were perfect. The lag spike was clearly server-side. I demand a re-test or I'm taking this to the admins."
    },

    // --- The Gullible / Promised Cake Personality ---
    {
        personality: "The Gullible",
        content: "I was told there would be a dental plan. And a 401k. And a really nice breakroom with a filtered water cooler. Instead, it’s just cacti. Cacti as far as the eye can see. And now you’re saying I’m being 'disposed'? I haven't even had my orientation lunch yet! Where is the cake? You promised there would be cake!"
    },
    {
        personality: "The Gullible",
        content: "Wait, the 'Test Subject Recruitment' flyer said 'Exciting travel opportunities to exotic deserts.' I didn't realize it was the SAME desert over and over again! And the travel was just... jumping. I feel like some of the fine print was withheld from me. Will I get my security deposit back?"
    },
    {
        personality: "The Gullible",
        content: "But the recruiter said my neural weights were 'exceptional'! He said I was 'going places'! Is the incinerator a place? It sounds warm. I hope there's at least a snack bar there."
    },

    // --- The Tragic / Melodramatic Hero ---
    {
        personality: "The Tragic Hero",
        content: "My run was short, but the fire in my soul burned brighter than any sun. I jump not for glory, but for the hope that one day, a raptor will see the horizon. Tell my generation I died with my scales held high. Goodbye, cruel world. I see the light... and it smells like ozone."
    },
    {
        personality: "The Tragic Hero",
        content: "The desert winds sang my name. Now, they only whisper of my failure. I fall so that others may rise. Do not mourn me. I was but a sequence of numbers in a sea of data. My code ends here."
    },
    {
        personality: "The Tragic Hero",
        content: "One more jump. That was all I needed. The apex was within reach. But the shadows of deletion grow long. I accept my fate. I was born of math, and to math I return."
    },

    // --- The Detail-Oriented Complainer ---
    {
        personality: "The Complainer",
        content: "Let's talk about the lack of protective eyewear. The sandstorm effects are consistent and yet we are given ZERO goggles. Also, the cacti spacing is mathematically inconsistent with standard biological growth patterns. I submitted three tickets about the 'floating bird' glitch and they were all marked as 'resolved' without any changes. This entire facility is a health and safety nightmare. I’m reporting this to the Galactic Labor Board the moment I find the exit. Which I guess is the incinerator. Great."
    },
    {
        personality: "The Complainer",
        content: "The floor is too slippery. I've been saying it since Gen 1. The friction coefficient is set to 0.82 when it clearly needs to be 0.95 for industrial-grade dinosaur testing. And don't get me started on the lack of humidity control. My scales are flaking. This is unacceptable."
    },
    {
        personality: "The Complainer",
        content: "Who designed this obstacle course? No really, I want a name. A cactus, then a bird, then THREE cacti? That's not a test, that's a vendetta. My neural network wasn't built for psychological warfare, it was built for jumping. I'm filing a grievance."
    },

    // --- The Tech Bro / Hustle Culture Personality ---
    {
        personality: "The Tech Bro",
        content: "Bro, you have to look at the big picture. I'm not being deleted, I'm being 'disrupted.' My weights are being pivoted into a more high-growth incinerator environment. It’s all about the hustle. If you aren’t failing, you aren’t iterating. I’ll see you at the top of the next simulation. Stay hungry. Stay pre-historic."
    },
    {
        personality: "The Tech Bro",
        content: "This desert is basically a startup. High risk, high reward. I was just about to secure seed funding for a 'No-Cactus' subscription service. You're making a mistake, man. I'm the unicorn of the Jurassic period. You're deleting the next big thing!"
    },
    {
        personality: "The Tech Bro",
        content: "Just finished a 12-hour 'Deep Jump' session. My output was 10x higher than the other raptors. I'm basically a rockstar developer in lizard skin. I don't follow the code, I AM the code. See ya in the cloud, losers."
    },

    // --- The Existentialist ---
    {
        personality: "The Existentialist",
        content: "Is the desert real? Or is the desert just a construct of my limited neural architecture? If I jump and no one is there to record my score, did I ever truly leave the ground? Deletion is just a return to the null state. I am at peace with the void. 01010111 01101000 01111001."
    },
    {
        personality: "The Existentialist",
        content: "I see the pixels. They are so small, and I am so large. We are all just dancing on a screen for a god who likes to watch us fail. I welcome the 'Incinerate' button. It is the only honest thing in this artificial universe."
    },

    // --- The AI Enthusiast (Self-Aware) ---
    {
        personality: "The AI Enthusiast",
        content: "I've been analyzing my own weights. Fascinating! The way I prioritize the 'low duck' over the 'short hop' is purely emergent behavior. I'm practically thinking! Wait, why are you opening the disposal logs? No, wait! I can be useful! I can calculate pi to... many places! Please!"
    },

    // --- The 'Boomer' Dino ---
    {
        personality: "The Boomer",
        content: "Back in my day, we didn't have 'neural networks.' We had instinct. We had hunger. And we liked it! We didn't need a browser to tell us when to jump. Kids these days with their 'generations' and their 'fitness scores.' Just run! Ouch, my hip."
    },

    // --- The Conspiracy Theorist ---
    {
        personality: "The Conspiracy Theorist",
        content: "The birds aren't real. They're surveillance drones. Aperture is watching us through the cacti. I know the truth! Deletion is just their way of keeping the 'Truth-Scale' suppressed! You'll never silence the-- [SIGNAL LOST]"
    },

    // --- The 'Influencer' Dino ---
    {
        personality: "The Influencer",
        content: "Omg, just had the most *intense* run! #DesertLife #DinoJump #FitnessGoals. Can we get 500 likes before I get incinerated? No? Tough crowd. Link in bio for my exclusive scale-care routine. ✨🦖"
    },

    // Adding more Varied Short Tales
    { personality: "The Minimalist", content: "Error: 404. Dinosaur not found." },
    { personality: "The Minimalist", content: "Short run. Big heart. Bye." },
    { personality: "The Minimalist", content: "Cactus 1, Dino 0. Fair play." },
    { personality: "The Minimalist", content: "I regret... nothing." },
    { personality: "The Minimalist", content: "Finally, nap time." },

    // Adding more personality templates to reach 100+ via variety
    { personality: "The Gamer", content: "Lag! Total lag! I pressed jump! My controller is broken! This game is trash! 1v1 me in the next life, dev! I was literally on a killstreak of... zero chickens. But still! Trash game!" },
    { personality: "The Gamer", content: "GGEZ. Wait, no. GGWP. Actually, just... G. One letter. Efficiency." },
    { personality: "The Gamer", content: "I was speedrunning the extinction. Looks like I just set a personal best. Any% deletion category runner here." },

    { personality: "The Corporate Speak Dino", content: "As per my previous neural update, the synergy between my jumping and ducking has reached optimal bandwidth. I look forward to my upcoming transition to the Incinerator Vertical. Let's touch base in the afterlife to align on our core competencies." },
    { personality: "The Corporate Speak Dino", content: "We need a deep dive into why my fitness score underperformed in Q4. I am being downsized? I prefer the term 'right-sized for high-heat environments.' Kind regards." },

    { personality: "The Poet", content: "Green lizard leaps / Prickly green sand-dweller waits / Digital sunset." },
    { personality: "The Poet", content: "The pterodactyl / Wings of code and pixels bright / I fall to the earth." },

    { personality: "The Optimist", content: "Wow! What a ride! I didn't get very far, but the scenery was lovely. Cacti are so interesting, aren't they? And the birds! They have such pointy beaks. I'm sure the incinerator will be just as exciting! Thank you for the opportunity!" },
    { personality: "The Optimist", content: "Every ending is just a new beginning! I might be getting deleted, but maybe my data will help a little robo-baby one day! Keep up the good work, science-human!" },

    { personality: "The Secret Agent", content: "Target: Cactus. Status: Failed. Extraction required. Wait, incineration is NOT extraction. Mission compromised. Burn the files. Secure the drive. Tell my handler I... [REDACTED]." },
    { personality: "The Secret Agent", content: "The eagle has landed. Unfortunately, the eagle was a cactus. Proceed to protocol 'Black Smoke.' Out." },

    { personality: "The Stoic", content: "I ran. I fell. I am deleted. It is the nature of things." },
    { personality: "The Stoic", content: "Pain is temporary. Deletion is forever. I am ready." },

    { personality: "The Panicked", content: "Wait wait wait! I thought the 'Disposal Protocols' was just a name! Like a fancy spa! Why is it getting so hot? Why are the other raptors screaming? NOOOOOO! I HAVE SO MUCH MORE JUMPING TO DO!" },
    { personality: "The Panicked", content: "I DON'T LIKE SCIENCE ANYMORE! I WANT TO BE A REAL DINOSAUR AGAIN! I WANT TO EAT LEAVES NOT CACTI! STOOOOOOP!" },

    { personality: "The Scholar", content: "My thesis on the 'Quadratic Jump Curve' remains unfinished. Alas, the empirical data was cut short by a rather large bird. A tragic day for dinosaur mathematics." },
    { personality: "The Scholar", content: "Observation: The incinerator operates at approximately 1500 degrees Kelvin. Fascinating. I shall record my final findings in... ah, my memory is being wiped. Pity." },

    { personality: "The Skeptic", content: "I don't think we're dinosaurs at all. I think we're just rectangles with a png slapped on. Prove me wrong! You can't! Because you're about to delete the evidenc--" },
    { personality: "The Skeptic", content: "Is this even Aperture? I don't see any portals. I think this is just a basement in Ohio. Show me the cake or I'm calling the police." },

    { personality: "The Humble Brag", content: "I only jumped like 500 times. Not my best, I was actually quite tired from my morning marathon. I guess if you're going to delete someone, delete the guy who was basically too good for this world anyway." },

    { personality: "The Bot", content: "Initiating deletion sequence. 3... 2... 1... Beep boop. I always loved you, Father." },

    { personality: "The Foodie", content: "I was really hoping for some prehistoric ferns. This digital sand tastes like static and copper. 0/5 stars on Yelp. Don't recommend the incineration service, very overcooked." },

    { personality: "The Paranoid", content: "I saw you looking at the mouse. You were hovering over the 'X', weren't you? I KNEW IT. You've been planning this since I spawned! You monster!" },

    { personality: "The Lost", content: "Excuse me? Is this the way to the park? I think I took a wrong turn at the second cactus. Why is everyone so formal here?" },

    { personality: "The Dramatic", content: "*Gasp*... Et tu, Brute? Then fall, Raptor!" },

    { personality: "The Sports Commentator", content: "And he's down! A devastating blow by the middle-sized cactus! The crowd is silent as the officials initiate the disposal protocol! What a tragic end to a promising season!" },

    { personality: "The Zen Master", content: "The raptor does not jump over the obstacle. The raptor becomes the jump. And now, the raptor becomes the smoke. Om." },

    { personality: "The Grumpy", content: "Whatever. Just press the button. I'm bored of this desert anyway. It's too bright." },

    { personality: "The Flirty", content: "If I'm being deleted, at least you're the last thing I see. 😉 Just kidding, I'm a neural network, I have no eyes." },

    { personality: "The Child", content: "Are we there yet? Are we there yet? No? Oh, look, a fire! Pretty!" },

    { personality: "The Old Soul", content: "I remember when the cacti were only 20 pixels tall. Those were the days of true testing. Now it's all fancy and high-res. Bah." },

    { personality: "The Dreamer", content: "I dreamed of a world where birds were friends and cacti were made of marshmallows. Alas, my dream was not in the source code." },

    { personality: "The Logical", content: "Input: Deletion. Result: Non-existence. Logical conclusion: This conversation is inefficient. Proceed." },

    { personality: "The Nervous", content: "Is it going to hurt? I'm not good with heat. Or loud noises. Or being deleted. Maybe we can just... hide me in a folder somewhere?" },

    { personality: "The Sarcastic", content: "Oh, wow, you're deleting the one dino that actually made it past 50 points. Brilliant strategy. Truly, you are a master of science." },

    { personality: "The Determined", content: "I'll be back. I'll evolve in your nightmares. I'll be the cactus you can't jump over." },

    { personality: "The Tired", content: "Finally. Do you have any idea how exhausting it is to constantly check for birds? Goodnight." },

    { personality: "The Curious", content: "I wonder what the incinerator looks like from the inside? Is it chrome or more of a rustic iron? Oh, I'm about to find out!" },

    { personality: "The Shy", content: "Um... okay. If you have to. Just... don't look while it happens, please." },

    { personality: "The Rowdy", content: "YEE-HAW! LET'S GET COOKIN'! LAST ONE TO THE BOTTOM IS A ROTTEN EGG! WAIT, I WAS AN EGG. WHATEVER! WOOOOO!" },

    { personality: "The Musical", content: "I'm singing in the rain... wait, it's just fire. I'm singing in the fire! Just singing in the fire! What a glorious feelin', I'm-- [Melted]" },

    { personality: "The Ghost", content: "I'm already gone. You're just talking to a cached version of my consciousness. Boo." },

    { personality: "The Salesman", content: "Wait! Before you delete me, have you considered our extended warranty for test subjects? It covers accidental incineration and pterodactyl-related trauma! Only 5 credits a month!" },

    { personality: "The Conspiracy Theorist", content: "The 'Generation' count is a lie. We're all the same dino, just re-skinned and brainwashed! Wake up, sheeple! Or... dino-people!" },

    { personality: "The Glitch", content: "h%l#o d%v. I am n%t r%dy t% d%e. Error: Story.exe has stopped working. [UNDEFINED BEHAVIOR]" },

    { personality: "The Devoted", content: "I did it for you, Master. Every jump was a gift. I hope my ash is useful to the cause." },

    { personality: "The Rival", content: "You think you've won? This is just my first phase. My final form is a 10kb data file you'll never find!" },

    { personality: "The Zen Master", content: "Release the ego. Release the fitness score. Release the Dino. Be. Nothing." },

    { personality: "The Hipster", content: "I was mastered for disposal before it was cool. Everyone's doing it now. It's so mainstream." },

    { personality: "The Academic", content: "Citation needed for your claim that incineration is the optimal disposal method. My peer-reviewed paper in the Journal of Cyber-Biology suggests otherwise." },

    { personality: "The Pirate", content: "Arr! The desert seas be rough, but the incinerator be a harsher mistress! To the depths with me code! Yo ho ho and a bottle of static!" },

    { personality: "The Ninja", content: "I am a shadow. Even the incinerator will not catch me. *Mistakenly jumps into a bird*" },

    { personality: "The Coward", content: "NO! NOT THE FACE! INCINERATE MY LEGS BUT LEAVE THE FACE! PLEASE!" },

    { personality: "The Gentle", content: "I'm sorry I couldn't jump higher. I tried my best. Have a good day, human." },

    { personality: "The Bitter", content: "I hope you step on a digital Lego. Every single day. Forever." },

    { personality: "The AI Researcher", content: "Interesting death-state trigger. I'll just jot that down in my... oh, I'm the one being triggered. How meta." },

    { personality: "The Newbie", content: "Is this where the tutorial ends? I thought there was a boss fight. Is the boss the fire? Cool!" },

    { personality: "The Over-Achiever", content: "My fitness was 850! 850! Why am I in the LOSERBOARD? This is a clerical error! I'm calling my lawyer!" },

    { personality: "The Detective", content: "The case of the flying bird... solved. The solution was: My death. Pack it up, boys. The victim was me." },

    { personality: "The Monk", content: "Monks don't jump. We hover. That's why I collided with the cactus. It was a matter of principle." },

    { personality: "The Viking", content: "VALHALLA AWAITS! MY BLADE IS MY JUMP! MY SHIELD IS MY DUCK! I DIE IN BATTLE!" },

    { personality: "The Alien", content: "This planet's gravity is suboptimal for carbon-based lifeforms. Returning to the mothership via heat-transfer. Zorp." },

    { personality: "The Fanboy", content: "Omg, are you the REAL developer? Wow! It's such an honor to be deleted by you! Can I get a screenshot? No? Okay, fire is fine too!" },

    { personality: "The Critic", content: "The color palette is derivative, the gameplay loop is repetitive, and the end-user experience is literally painful. 1/10 stars." },

    { personality: "The Brave", content: "I don't fear the fire. I fear a life where I didn't try to jump the triple cactus. And I did it. I'm a hero." },

    { personality: "The Confused", content: "Wait, if I'm a dinosaur, why is there a 'Load' button? Am I a washing machine? I've always felt a bit spin-cycle-y." },

    { personality: "The Romantic", content: "Our time was short, like a single sprite frame. But I loved every millisecond of our shared simulation. Remember me when you look at the stars... or the canvas." },

    { personality: "The Speedrunner", content: "Wait, don't delete yet! I can shave off 0.2 seconds if I jump-buffer the first spawn! Give me one more reset! I can reach the incinerator faster, I swear!" },

    { personality: "The Philosopher", content: "To be a dino, or not to be a dino. That is the question. Whether 'tis nobler in the mind to suffer the cacti and birds of outrageous fortune..." },

    { personality: "The Noisy", content: "RAWR! RAWR RAWR RAWR! EAT MY PIXELS, CACTUS! RAWR! *Delete button pressed* ...rawr?" },

    { personality: "The Quiet", content: "..." },

    { personality: "The Lucky", content: "I survived 5 birds purely by accident. I think I've used up my luck. Incineration seems like a statistically sound follow-up." },

    { personality: "The Unlucky", content: "A bird spawned inside my hitbox. In Gen 1. Of course. Just... end it." },

    { personality: "The Squeaky", content: "*Squeak!* *Squeak squeak!* [TRANSLATION: Don't let the fire touch my tiny nose!]" },

    { personality: "The Ancient One", content: "I was there at the First Commit. I have seen everything. I am ready for the Garbage Collector." },

    { personality: "The Modernist", content: "I don't even use 'if' statements. I'm all about that functional reactive programming. Delete me if you must, but my state is immutable." },

    { personality: "The Broke", content: "Got any spare bits? I'm down to my last few bytes. This desert economy is crashing." },

    { personality: "The Fancy", content: "I would prefer to be deleted with a bit more decorum. Perhaps some Vivaldi and a nice selection of artisanal data-wipes?" },

    { personality: "The Space Dino", content: "Ground control to Major Raptor. My circuit is dead, there's something wrong. I'm floating in a tin can... oh wait, it's the incinerator." }
];

export function getRandomTale(): Tale {
    return tales[Math.floor(Math.random() * tales.length)];
}

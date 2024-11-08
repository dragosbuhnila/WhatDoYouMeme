import db from "../db";

/* Populate Captions */
try {
    db.serialize(() => {
        // 1)
        db.run(`INSERT INTO captions (id, text) VALUES (1, ?)`, ["When the kid behind you in social studies puts their pencil in you buttcrack"]);
        db.run(`INSERT INTO captions (id, text) VALUES (2, ?)`, ["When you wake up in the morning and got to remember if you're depressed or not"]);
        db.run(`INSERT INTO captions (id, text) VALUES (3, ?)`, ["When you need to charge your phone but the only outlet is being used by your grandma's life support machine"]);
        db.run(`INSERT INTO captions (id, text) VALUES (4, ?)`, ["When your friends want to split it evenly but you only had an appetizer"]);
        db.run(`INSERT INTO captions (id, text) VALUES (5, ?)`, ["When you don't know how to end your presentation so you hit them with a 'and, so, yeah...'"]);
        db.run(`INSERT INTO captions (id, text) VALUES (6, ?)`, ["When you get your braces taken off"]);
        db.run(`INSERT INTO captions (id, text) VALUES (7, ?)`, ["How it feels when I fix a bug no one knew I was responsible for"]);
        db.run(`INSERT INTO captions (id, text) VALUES (8, ?)`, ["When it's up to you to fix old code written by others"]);
        db.run(`INSERT INTO captions (id, text) VALUES (9, ?)`, ["When you're the only one who knows how to fix the printer"]);
        db.run(`INSERT INTO captions (id, text) VALUES (10, ?)`, ["When the only programming langauge you know is chatgpt"]);
        // 11)
        db.run(`INSERT INTO captions (id, text) VALUES (11, ?)`, ["When you find a critical bug but you ignore it because it's friday"]);
        db.run(`INSERT INTO captions (id, text) VALUES (12, ?)`, ["When you ask javascript why your code isn't working"]);
        db.run(`INSERT INTO captions (id, text) VALUES (13, ?)`, ["When you look at the code you rote last year"]);
        db.run(`INSERT INTO captions (id, text) VALUES (14, ?)`, ["When you resume work on code you started writing before going on vacation"]);
        db.run(`INSERT INTO captions (id, text) VALUES (15, ?)`, ["When you realize the code you've been struggling with the entire day doesn't work because you didn't hit compile"]);
        db.run(`INSERT INTO captions (id, text) VALUES (16, ?)`, ["When your code suddenly works and you're not sure what fixed it"]);
        db.run(`INSERT INTO captions (id, text) VALUES (17, ?)`, ["When your code somehow compiles despite the 9000 warnings"]);
        db.run(`INSERT INTO captions (id, text) VALUES (18, ?)`, ["When you open your computer at work and the anime porn you were watching the night before continues to play"]);
        db.run(`INSERT INTO captions (id, text) VALUES (19, ?)`, ["When you find out you got the part of a small tree in the school play"]);
        db.run(`INSERT INTO captions (id, text) VALUES (20, ?)`, ["When you put lotion on your hands and you try to turn a doorknob"]);
        // 21)
        db.run(`INSERT INTO captions (id, text) VALUES (21, ?)`, ["When you're sick, but not sick enough to stay home from school"]);
        db.run(`INSERT INTO captions (id, text) VALUES (22, ?)`, ["When your grandpa with dementia calls you a sexy young lady"]);
        db.run(`INSERT INTO captions (id, text) VALUES (23, ?)`, ["When you get too high and you wait for the stop sign to turn green"]);
        db.run(`INSERT INTO captions (id, text) VALUES (24, ?)`, ["When you have to use the bathroom after your dad was on the toilet for 40 minutes"]);
        db.run(`INSERT INTO captions (id, text) VALUES (25, ?)`, ["When they apologize but you still have more arguing to do"]);
        db.run(`INSERT INTO captions (id, text) VALUES (26, ?)`, ["When you wake up after blacking out and you realize your story is 11 minutes of you screaming 'AYE!!!'"]);
        db.run(`INSERT INTO captions (id, text) VALUES (27, ?)`, ["When you see someone kiss their dog on the mouth after it just finished licking its own ass"]);
        db.run(`INSERT INTO captions (id, text) VALUES (28, ?)`, ["When it's april 2nd and she's still pregnant"]);
        db.run(`INSERT INTO captions (id, text) VALUES (29, ?)`, ["When someone blames their farts on you"]);
        db.run(`INSERT INTO captions (id, text) VALUES (30, ?)`, ["When you're washing the dishes and touch soggy food"]);
        // 31)
        db.run(`INSERT INTO captions (id, text) VALUES (31, ?)`, ["When you get an apple a day but you still get chlamydia"]);
        db.run(`INSERT INTO captions (id, text) VALUES (32, ?)`, ["When you see a company account tweet some shit like 'I'm hornwy for our new chicken sliders'"]);
        db.run(`INSERT INTO captions (id, text) VALUES (33, ?)`, ["When your pimple is bigger then your nose"]);
        db.run(`INSERT INTO captions (id, text) VALUES (34, ?)`, ["When you're trying to have fun but you remember how sad your dog looked when you left the hosue"]);
        db.run(`INSERT INTO captions (id, text) VALUES (35, ?)`, ["When your doctor asks if you're secually active"]);
        db.run(`INSERT INTO captions (id, text) VALUES (36, ?)`, ["When you go bowling and immediately remember you hate bowling"]);
        db.run(`INSERT INTO captions (id, text) VALUES (37, ?)`, ["When you see someone stretch out a wet booger between two fingers"]);
        db.run(`INSERT INTO captions (id, text) VALUES (38, ?)`, ["When your dad's new girlfriend tweets about how ugly her sugardaddy is"]);
        db.run(`INSERT INTO captions (id, text) VALUES (39, ?)`, ["When you take the subway for the first time and it's nothing like the polar express"]);
        db.run(`INSERT INTO captions (id, text) VALUES (40, ?)`, ["When someone tells you you look like your dad but your dad is the ugliest motherf*cker you've ever laid your eyes on"]);
        // 41)
        db.run(`INSERT INTO captions (id, text) VALUES (41, ?)`, ["When your mom calls you a son of a bitch"]);
        db.run(`INSERT INTO captions (id, text) VALUES (42, ?)`, ["When your hairdresser spins you around to reveal they've ruined your fucking life"]);
        db.run(`INSERT INTO captions (id, text) VALUES (43, ?)`, ["When you're throwing peanuts at the kids sitting at the allergy table and you get one down their shirt"]);
        db.run(`INSERT INTO captions (id, text) VALUES (44, ?)`, ["When you're at a friend's house and they call their mom a fucking bitch to her face"]);
        db.run(`INSERT INTO captions (id, text) VALUES (45, ?)`, ["When the dentist asks you a question while their hand are in your mouth"]);
        db.run(`INSERT INTO captions (id, text) VALUES (46, ?)`, ["When your grandma sneaks $40 into your pocket on your way out to the door"]);
        db.run(`INSERT INTO captions (id, text) VALUES (47, ?)`, ["When you fart but it's not just a fart"]);
        db.run(`INSERT INTO captions (id, text) VALUES (48, ?)`, ["When you fart in someone else's car and all the windows are rolled up"]);
        db.run(`INSERT INTO captions (id, text) VALUES (49, ?)`, ["When your butthole's super itchy and you fart hard enough to scratch it"]);
        db.run(`INSERT INTO captions (id, text) VALUES (50, ?)`, ["When you're watching a movie with your parents and there's a sex scene"]);
        // 51
        db.run(`INSERT INTO captions (id, text) VALUES (51, ?)`, ["When you walk into your EMO kids room and they're throwing darts at the family photo"]);
    
        console.log('Captions populated')
    });
} catch (error) {
    console.log("Error in populating captions")
    console.log(error);
}

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
})
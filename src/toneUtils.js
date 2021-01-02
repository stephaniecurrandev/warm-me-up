import * as Tone from 'tone';

const scales = [
    "C, D, E, F, G, A, B, C",
    "C#, Eb, F, F#, Ab, Bb, C, C#",
    "D, E, F#, G, A, B, C#, D",
    "E, F#, Ab, A, B, C#, Eb, E",
    "F, G, A, Bb, C, D, E, F",
    "F#, Ab, Bb, B, C#, Eb, F, F#",
    "G, A, B, C, D, E, F#, G",
    "Ab, Bb, C, Db, Eb, F, G, Ab",
    "A, B, C#, D, E, F#, Ab, A",
    "Bb, C, D, Eb, F, G, A, Bb",
    "B, C#, Eb, E, F#, Ab, Bb, B",
]

// const scales = [
//     "Ab, Bb, C, Db, Eb, F, G, Ab",
//     "A, B, C#, D, E, F#, G#, A",
//     "Bb, C, D, Eb, F, G, A, Bb",
//     "B, C#, D#, E, F#, G#, A#, B",
//     "C, D, E, F, G, A, B, C",
//     "Db, Eb, F, Gb, Ab, Bb, C, Db",
//     "D, E, F#, G, A, B, C#, D",
//     "E, F#, G#, A, B, C#, D#, E",
//     "F, G, A, Bb, C, D, E, F",
//     "F#, G#, A#, B, C#, D#, F, F#",
//     "G, A, B, C, D, E, F#, G",
// ]

export const getWarmup = (exerciseIndexes)=> {
    const splitNotes = scales.map((x)=> x.split(", "));
    
    const exerciseArrs = [];

    let majorOctave = 3;
    while(majorOctave < 7) {
        splitNotes.forEach(scale=>{
            let octscale = [];
            let exercise = [];
            let octave = majorOctave;
            const Cscale = scale[0].includes("C");

            scale.forEach((note, j)=>{
                if(note.includes("C") && !(Cscale && (j==0 || j ==6)) && octave < majorOctave+1){
                    octave++;
                }
                octscale.push(note+octave);
            });
            exerciseIndexes.forEach(exIn => {
                exercise.push(octscale[exIn]);
            });
            exerciseArrs.push(exercise);
            if(scale[0].includes("B")&& !scale[0].includes("Bb")){
                majorOctave++;
            }
        })
    }
    return exerciseArrs;
};

const playArray = (arr,sampler,length)=> {
    let time = Tone.now();
    arr.forEach(note=>{
        // trigger the attack immediately
        sampler.triggerAttack(note, time)
        // wait one second before triggering the release
        sampler.triggerRelease(time + length)
        time+=length;
    });
   // setTimeout(()=> sampler.releaseAll(),5000);
}

export const playExercise = (arr, length = .5) => {
    console.log(arr);
    const urls = {};
    // arr.forEach((note)=>{
    //     urls[note] = encodeURIComponent(`${note}.mp3`);
    // });
    // const sampler = new Tone.Sampler({
    //     urls,
    //     release: .5,
    //     baseUrl: "https://raw.githubusercontent.com/stephaniecurrandev/pianonotes/master/",
    //     onload: function() {
    //         playArray(arr,sampler);
    //     }
    // }).toDestination();
    const synth = new Tone.Synth().toDestination();
    playArray(arr,synth, length);

}



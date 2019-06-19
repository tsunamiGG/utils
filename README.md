# utils

some utils

1. canvas-moblie-signnature         default: {color: '#090600' ,lineWidth: 10, lineCap: 'round' }

```vue
// vue demo
<script>
import {Draw} from '../../utils/canvasSign'

export default {
    name: "canvasSign",
    data() {
        return {
            canvasImg: String,
            draw: Function
        }
    },
    mounted() {
        this.draw = new Draw('sign',670,328);
        this.draw.ready();
    },
    methods:{
        clear: function() {
            this.draw.clear()
        },
        saveUrl: function() {
            this.canvasImg = this.draw.save()
        }
    }
}
</script>
```




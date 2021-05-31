package com.foodonstoves
import android.os.Bundle
import com.facebook.react.ReactActivity

class MainActivity : ReactActivity() {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    override fun getMainComponentName(): String? {
        return "FoodOnStoves"
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(null)
    }   
}
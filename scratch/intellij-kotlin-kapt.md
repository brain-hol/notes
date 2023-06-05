# IntelliJ, Kotlin, and Kapt

I looked into using Kotlin with Micronaut a little bit yesterday and found that IntelliJ doesn't work with Kapt,[^1] which is the Annotation Processor that Micronaut uses.

Kapt is marked as maintenance only now by JetBrains[^2] and they switched to KSP. Micronaut v4 has experimental support[^3] for KSP but I don't believe that v4 is officially released yet.

[^1]: https://docs.micronaut.io/4.0.0-M2/guide/index.html#kaptintellij
[^2]: https://kotlinlang.org/docs/kapt.html
[^3]: https://docs.micronaut.io/4.0.0-M2/guide/index.html#kaptOrKsp

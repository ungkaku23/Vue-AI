<template>
  <div class="container">
    <h2 id="pricing_heading" class="pricing__heading">
      One flat rate.<br />Cancel anytime.
    </h2>
    <div data-duration-in="400" data-duration-out="200" class="tabs-2 w-tabs">
      <div class="tabs-menu-v2-2 w-tab-menu">
        <div
          data-w-tab="Tab 1"
          class="tab-link-v2-2 w-inline-block w-tab-link"
          :class="{ 'w--current': !isMonthly }"
          @click="isMonthly = false"
        >
          <div>Pay Annually</div>
        </div>
        <div
          data-w-tab="Tab 2"
          class="tab-link-v2-2 w-inline-block w-tab-link"
          :class="{ 'w--current': isMonthly }"
          @click="isMonthly = true"
        >
          <div>Pay Monthly</div>
        </div>
      </div>
      <div class="full-width w-tab-content" v-if="loaded">
        <div
          data-w-tab="Tab 1"
          class="pricing-tab-content w-tab-pane"
          :class="{ 'w--tab-active': !isMonthly }"
        >
          <div class="w-layout-grid main-grid">
            <div
              id="w-node-_9226c484-4fa2-5727-92cd-073ad605fbfb-faf2d5a5"
              class="pricing-v2-card"
            >
              <div class="pricing-v2-header-2">
                <div class="pricing-v2-name">Free Trial</div>
                <div class="pricing-v2-description">
                  Try FREE for 7 days, see how GURU works for you!<br />
                </div>
                <img
                  src="@/assets/images/icons/decor-v1.svg"
                  alt=""
                  class="pricing-v2-wave"
                />
                <div class="small-bg-elements">
                  <div class="small-bg-element-5"></div>
                  <div class="small-bg-element-6"></div>
                  <div class="small-bg-element-4"></div>
                </div>
              </div>
              <div class="pricing-v2-tag-2">
                <div>$0</div>
                <div class="pricing-v2-billing-2">7 Days</div>
              </div>
              <div class="pricing-v2-card-info">
                <div class="pricing-v2-features">
                  <div class="pricing-feature-2">
                    <div class="pricing-feature-icon-2"></div>
                    <div><strong>Unlimited Runs</strong></div>
                  </div>
                  <div class="pricing-feature-2">
                    <div class="pricing-feature-icon-2"></div>
                    <div>For <strong>Personal</strong> Use</div>
                  </div>
                  <div class="pricing-feature-2">
                    <div class="pricing-feature-icon-2"></div>
                    <div>Access all features<strong></strong></div>
                  </div>
                  <div class="pricing-feature-2">
                    <div class="pricing-feature-icon-2"></div>
                    <div>Free for 7 days<strong></strong></div>
                  </div>
                  <div class="pricing-feature-2 no">
                    <div class="pricing-feature-icon-2 no"></div>
                    <div class="text-block-10">No CMS Content</div>
                  </div>
                </div>
                <router-link
                  :to="{ name: $routerItems.REGISTER }"
                  class="button-6 w-button"
                  >Start Free Trial</router-link
                >
              </div>
            </div>
            <div
              id="w-node-_9226c484-4fa2-5727-92cd-073ad605fc2d-faf2d5a5"
              class="pricing-v2-card"
            >
              <div class="pricing-v2-header-2">
                <div class="pricing-v2-name">Maverick</div>
                <div class="pricing-v2-description">
                  <strong
                    >Ideal for the individual who wants to get ahead faster, and
                    write more efficiently.</strong
                  >
                </div>
                <img
                  src="@/assets/images/icons/decor-v1.svg"
                  alt=""
                  class="pricing-v2-wave"
                />
                <div class="small-bg-elements">
                  <div class="small-bg-element-5"></div>
                  <div class="small-bg-element-6"></div>
                  <div class="small-bg-element-4"></div>
                </div>
              </div>
              <div class="pricing-v2-tag-2">
                <div>{{ plans[2].amount }}</div>
                <div class="pricing-v2-billing-2">
                  billed annually
                </div>
              </div>
              <div class="pricing-v2-card-info">
                <div class="pricing-v2-features">
                  <div class="pricing-feature-2">
                    <div class="pricing-feature-icon-2"></div>
                    <div><strong>Single User</strong></div>
                  </div>
                  <div class="pricing-feature-2">
                    <div class="pricing-feature-icon-2"></div>
                    <div>Unlimited Runs</div>
                  </div>
                  <div class="pricing-feature-2">
                    <div class="pricing-feature-icon-2"></div>
                    <div>
                      <strong>Personal or Professional Use</strong>
                    </div>
                  </div>
                  <div class="pricing-feature-2">
                    <div class="pricing-feature-icon-2"></div>
                    <div>Lifetime Updates</div>
                    <div class="info">
                      <div class="info-icon"></div>
                      <div class="tooltip-2 hidden">
                        <div>
                          Writing result-oriented ad copy is difficult, as it
                          must appeal to, entice, and convince consumers to take
                          action.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="pricing-feature-2">
                    <div class="text-block-11">CMS Content</div>
                  </div>
                </div>
                <router-link
                  :to="{ name: $routerItems.REGISTER }"
                  class="button-6 w-button"
                  >Start Free Trial</router-link
                >
              </div>
              <div class="pricing-badge-2">
                <div class="pricing-badge-icon"></div>
                <div>Recommended</div>
              </div>
            </div>
            <div
              id="w-node-_9226c484-4fa2-5727-92cd-073ad605fc61-faf2d5a5"
              class="pricing-v2-card"
            >
              <div class="pricing-v2-header-2">
                <div class="pricing-v2-name">Squad</div>
                <div class="pricing-v2-description">
                  <strong
                    > Save time, get more done and boost your team's creativity.</strong
                  >
                </div>
                <img
                  src="@/assets/images/icons/decor-v1.svg"
                  alt=""
                  class="pricing-v2-wave"
                />
                <div class="small-bg-elements">
                  <div class="small-bg-element-5"></div>
                  <div class="small-bg-element-6"></div>
                  <div class="small-bg-element-4"></div>
                </div>
              </div>
              <div class="pricing-v2-tag-2">
                <div>{{ plans[3].amount }}</div>
                <div class="pricing-v2-billing-2">
                  billed annually
                </div>
              </div>
              <div class="pricing-v2-card-info">
                <div class="pricing-v2-features">
                  <div class="pricing-feature-2">
                    <div class="pricing-feature-icon-2"></div>
                    <div><strong>Up to 5 users</strong></div>
                  </div>
                  <div class="pricing-feature-2">
                    <div class="pricing-feature-icon-2"></div>
                    <div>Unlimited Runs</div>
                  </div>
                  <div class="pricing-feature-2">
                    <div class="pricing-feature-icon-2"></div>
                    <div>
                      <strong>Personal or Professional Use</strong>
                    </div>
                  </div>
                  <div class="pricing-feature-2">
                    <div class="pricing-feature-icon-2"></div>
                    <div>Lifetime Updates</div>
                    <div class="info">
                      <div class="info-icon"></div>
                      <div class="tooltip-2 hidden">
                        <div>
                          Writing result-oriented ad copy is difficult, as it
                          must appeal to, entice, and convince consumers to take
                          action.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="pricing-feature-2 ew">
                    <div class="pricing-feature-icon-2 new"></div>
                    <div class="text-block-11">Interactions</div>
                    <div class="info">
                      <div class="tooltip-2 hidden">
                        <div>
                          Writing result-oriented ad copy is difficult, as it
                          must appeal to, entice, and convince consumers to take
                          action.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <router-link
                  :to="{ name: $routerItems.REGISTER }"
                  class="button-6 w-button"
                  >Start Free Trial</router-link
                >
              </div>
              <div class="text-block-6 squad">
                <br />Need more users?
                <router-link :to="{ name: $routerItems.DASHBOARD }"
                  >Contact us</router-link
                >
              </div>
            </div>
          </div>
        </div>
        <div
          data-w-tab="Tab 2"
          class="pricing-tab-content w-tab-pane"
          :class="{ 'w--tab-active': isMonthly }"
        >
          <div class="w-layout-grid main-grid">
            <div
              id="w-node-_9226c484-4fa2-5727-92cd-073ad605fc9d-faf2d5a5"
              class="pricing-v2-card"
            >
              <div class="pricing-v2-header-2">
                <div class="pricing-v2-name">Free Trial</div>
                <div class="pricing-v2-description">
                  Try us free for 7 days. Cancel anytime if you don&#x27;t like
                  it.
                </div>
                <img
                  src="@/assets/images/icons/decor-v1.svg"
                  alt=""
                  class="pricing-v2-wave"
                />
                <div class="small-bg-elements">
                  <div class="small-bg-element-5"></div>
                  <div class="small-bg-element-6"></div>
                  <div class="small-bg-element-4"></div>
                </div>
              </div>
              <div class="pricing-v2-tag-2">
                <div>$0</div>
                <div class="pricing-v2-billing-2">7 Days</div>
              </div>
              <div class="pricing-v2-card-info">
                <div class="pricing-v2-features">
                  <div class="pricing-feature-2">
                    <div class="pricing-feature-icon-2"></div>
                    <div><strong>Unlimited Runs</strong></div>
                  </div>
                  <div class="pricing-feature-2">
                    <div class="pricing-feature-icon-2"></div>
                    <div>For <strong>Personal</strong> Use</div>
                  </div>
                  <div class="pricing-feature-2">
                    <div class="pricing-feature-icon-2"></div>
                    <div>Free for 7 days<strong></strong></div>
                  </div>
                  <div class="pricing-feature-2 no">
                    <div class="pricing-feature-icon-2 no"></div>
                  </div>
                  <div class="pricing-feature-2 no">
                    <div class="pricing-feature-icon-2 no"></div>
                  </div>
                </div>
                <router-link
                  :to="{ name: $routerItems.REGISTER }"
                  class="button-6 w-button"
                  >Start Free Trial</router-link
                >
              </div>
            </div>
            <div
              id="w-node-_9226c484-4fa2-5727-92cd-073ad605fcc8-faf2d5a5"
              class="pricing-v2-card"
            >
              <div class="pricing-v2-header-2">
                <div class="pricing-v2-name">Maverick</div>
                <div class="pricing-v2-description">
                 Get more done faster without creative blocks or wasted time.
                </div>
                <img
                  src="@/assets/images/icons/decor-v1.svg"
                  alt=""
                  class="pricing-v2-wave"
                />
                <div class="small-bg-elements">
                  <div class="small-bg-element-5"></div>
                  <div class="small-bg-element-6"></div>
                  <div class="small-bg-element-4"></div>
                </div>
              </div>
              <div class="pricing-v2-tag-2">
                <div>{{ plans[0].amount }}</div>
                <div class="pricing-v2-billing-2">per month</div>
              </div>
              <div class="pricing-v2-card-info">
                <div class="pricing-v2-features">
                  <div class="pricing-feature-2">
                    <div class="pricing-feature-icon-2"></div>
                    <div><strong>Single User</strong></div>
                  </div>
                  <div class="pricing-feature-2">
                    <div class="pricing-feature-icon-2"></div>
                    <div>Unlimited A.I Access</div>
                  </div>
                  <div class="pricing-feature-2">
                    <div class="pricing-feature-icon-2"></div>
                    <div>Personal or Professional Use<strong></strong></div>
                  </div>
                  <div class="pricing-feature-2">
                    <div class="pricing-feature-icon-2"></div>
                    <div>Lifetime Updates</div>
                    <div class="info">
                      <div class="info-icon"></div>
                      <div class="tooltip-2 hidden">
                        <div>
                          Writing result-oriented ad copy is difficult, as it
                          must appeal to, entice, and convince consumers to take
                          action.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <router-link
                  :to="{ name: $routerItems.REGISTER }"
                  class="button-6 w-button"
                  >Start Free Trial</router-link
                >
              </div>
            </div>
            <div
              id="w-node-_9226c484-4fa2-5727-92cd-073ad605fcf5-faf2d5a5"
              class="pricing-v2-card"
            >
              <div class="pricing-v2-header-2">
                <div class="pricing-v2-name">Squad</div>
                <div class="pricing-v2-description">
                  Save time, get more done, and boost your team's creativity.
                </div>
                <img
                  src="@/assets/images/icons/decor-v1.svg"
                  alt=""
                  class="pricing-v2-wave"
                />
                <div class="small-bg-elements">
                  <div class="small-bg-element-5"></div>
                  <div class="small-bg-element-6"></div>
                  <div class="small-bg-element-4"></div>
                </div>
              </div>
              <div class="pricing-v2-tag-2">
                <div>{{ plans[1].amount }}</div>
                <div class="pricing-v2-billing-2">per month/5 users</div>
              </div>
              <div class="pricing-v2-card-info">
                <div class="pricing-v2-features">
                  <div class="pricing-feature-2">
                    <div class="pricing-feature-icon-2"></div>
                    <div><strong>Multiple Users</strong></div>
                  </div>
                  <div class="pricing-feature-2">
                    <div class="pricing-feature-icon-2"></div>
                    <div>Unlimited A.I Access</div>
                  </div>
                  <div class="pricing-feature-2">
                    <div class="pricing-feature-icon-2"></div>
                    <div><strong>Real-time collaboration</strong></div>
                  </div>
                  <div class="pricing-feature-2">
                    <div class="pricing-feature-icon-2"></div>
                    <div>Lifetime Updates</div>
                    <div class="info">
                      <div class="info-icon"></div>
                      <div class="tooltip-2 hidden">
                        <div>
                          Writing result-oriented ad copy is difficult, as it
                          must appeal to, entice, and convince consumers to take
                          action.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <router-link
                  :to="{ name: $routerItems.REGISTER }"
                  class="button-6 w-button"
                  >Start Free Trial</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as paymentService from "../../services/PaymentService";
export default {
  name: "PriceOverView",
  data() {
    return {
      isMonthly: true,
      loaded: false,
    };
  },
  beforeCreate: function () {
    paymentService
      .getHelloScribePlans()
      .then(
        function (response) {
          if (response) {
            this.plans = response.data.product.plans;
            this.loaded = true;
          }
        }.bind(this)
      )
      .catch(function (error) {});
  },
};
</script>

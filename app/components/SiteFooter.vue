<template>
  <footer id="footer">
    <n-flex class="link" align="center">
      <n-button
        v-for="item in footerLinks"
        :key="item.key"
        :focusable="false"
        quaternary
        circle
        @click="jumpLink(item.url)"
      >
        <template #icon>
          <Icon :name="`icon:${item.key}`" />
        </template>
      </n-button>
    </n-flex>
    <n-flex :size="4" class="text" align="center" vertical>
      <n-p depth="3">
        <n-text depth="3" @click="jumpLink(linkData.github)">
          SiteStatus
        </n-text>
        Version {{ version }}
      </n-p>
      <n-p depth="3">
        {{ $t("footer.basedOn") }}
        <n-text depth="3" @click="jumpLink('https://uptimerobot.com/')">
          {{ $t("uptimeRobot") }}
        </n-text>
        {{ $t("footer.interface") }} |
        {{ $t("footer.checkFrequency") }}
        {{ $t("footer.fiveMinutes") }}
      </n-p>
      <n-p depth="3">
        Copyright &copy; 2020 - {{ new Date().getFullYear() }}
        <n-text depth="3" @click="jumpLink(imsyyUrl)"> IMSYY </n-text>
        <template v-if="siteAuthor">
          <span> &amp; </span>
          <n-text depth="3" @click="jumpLink(siteAuthorUrl)">
            {{ siteAuthor }}
          </n-text>
        </template>
        <template v-if="siteIcp">
          <span> | </span>
          <n-text depth="3" @click="jumpLink('https://beian.miit.gov.cn/')">
            {{ siteIcp }}
          </n-text>
        </template>
      </n-p>
    </n-flex>
  </footer>
</template>

<script setup lang="ts">
const { public: configPublic } = useRuntimeConfig();
const {
  siteIcp,
  version,
  siteGithub,
  siteHome,
  siteEmail,
  siteAuthor,
  siteAuthorUrl,
} = configPublic;

const imsyyUrl = "https://github.com/imsyy/";

const linkData = computed(() => ({
  github: siteGithub,
  home: siteHome,
  email: siteEmail
    ? siteEmail.includes(":")
      ? siteEmail
      : `mailto:${siteEmail}`
    : "",
}));

// Hide buttons whose link is not configured.
const footerLinks = computed(() =>
  Object.entries(linkData.value)
    .filter(([, url]) => Boolean(url))
    .map(([key, url]) => ({ key, url })),
);
</script>

<style lang="scss" scoped>
footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px 90px;
  margin-top: auto;
  z-index: 100;
  .text {
    margin-top: 12px;
    .n-p,
    .n-text {
      margin: 0;
      font-size: 13px;
      line-height: 26px;
    }
    .n-text {
      font-weight: bold;
      cursor: pointer;
      &:hover {
        color: var(--normal-color);
      }
    }
  }
}
</style>

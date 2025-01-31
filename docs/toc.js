// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="getting_started.html"><strong aria-hidden="true">1.</strong> Getting started</a></li><li class="chapter-item expanded "><a href="configuration.html"><strong aria-hidden="true">2.</strong> Configuration</a></li><li class="chapter-item expanded "><a href="pipelines/preface.html"><strong aria-hidden="true">3.</strong> Pipelines</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="pipelines/version.html"><strong aria-hidden="true">3.1.</strong> Version</a></li><li class="chapter-item expanded "><a href="pipelines/name.html"><strong aria-hidden="true">3.2.</strong> Name</a></li><li class="chapter-item expanded "><a href="pipelines/runs_on.html"><strong aria-hidden="true">3.3.</strong> Runs on</a></li><li class="chapter-item expanded "><a href="pipelines/cron.html"><strong aria-hidden="true">3.4.</strong> Cron</a></li><li class="chapter-item expanded "><a href="pipelines/dispose.html"><strong aria-hidden="true">3.5.</strong> Dispose</a></li><li class="chapter-item expanded "><a href="pipelines/variables.html"><strong aria-hidden="true">3.6.</strong> Variables</a></li><li class="chapter-item expanded "><a href="pipelines/environment.html"><strong aria-hidden="true">3.7.</strong> Envrironment</a></li><li class="chapter-item expanded "><a href="pipelines/keywords.html"><strong aria-hidden="true">3.8.</strong> Keywords</a></li><li class="chapter-item expanded "><a href="pipelines/artifacts.html"><strong aria-hidden="true">3.9.</strong> Artifacts</a></li><li class="chapter-item expanded "><a href="pipelines/external.html"><strong aria-hidden="true">3.10.</strong> External</a></li><li class="chapter-item expanded "><a href="pipelines/jobs_and_steps.html"><strong aria-hidden="true">3.11.</strong> Jobs and steps</a></li><li class="chapter-item expanded "><a href="pipelines/validation.html"><strong aria-hidden="true">3.12.</strong> Validation</a></li></ol></li><li class="chapter-item expanded "><a href="server/preface.html"><strong aria-hidden="true">4.</strong> Server</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="server/running_a_server.html"><strong aria-hidden="true">4.1.</strong> Running a server</a></li><li class="chapter-item expanded "><a href="server/database.html"><strong aria-hidden="true">4.2.</strong> Database</a></li><li class="chapter-item expanded "><a href="server/authorization.html"><strong aria-hidden="true">4.3.</strong> Authorization</a></li><li class="chapter-item expanded "><a href="server/tls.html"><strong aria-hidden="true">4.4.</strong> TLS</a></li><li class="chapter-item expanded "><a href="server/ssh.html"><strong aria-hidden="true">4.5.</strong> SSH</a></li><li class="chapter-item expanded "><a href="server/ui/preface.html"><strong aria-hidden="true">4.6.</strong> User interface</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="server/ui/login.html"><strong aria-hidden="true">4.6.1.</strong> Login</a></li><li class="chapter-item expanded "><a href="server/ui/dashboard.html"><strong aria-hidden="true">4.6.2.</strong> Dashboard</a></li><li class="chapter-item expanded "><a href="server/ui/history.html"><strong aria-hidden="true">4.6.3.</strong> History</a></li><li class="chapter-item expanded "><a href="server/ui/monitor.html"><strong aria-hidden="true">4.6.4.</strong> Monitor</a></li><li class="chapter-item expanded "><a href="server/ui/pipelines.html"><strong aria-hidden="true">4.6.5.</strong> Pipelines</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="server/ui/pipelines_info.html"><strong aria-hidden="true">4.6.5.1.</strong> Info</a></li><li class="chapter-item expanded "><a href="server/ui/pipelines_run.html"><strong aria-hidden="true">4.6.5.2.</strong> Run</a></li></ol></li><li class="chapter-item expanded "><a href="server/ui/cron.html"><strong aria-hidden="true">4.6.6.</strong> Cron jobs</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="server/ui/cron_info.html"><strong aria-hidden="true">4.6.6.1.</strong> Info</a></li></ol></li></ol></li></ol></li><li class="chapter-item expanded "><a href="github-action.html"><strong aria-hidden="true">5.</strong> Github action</a></li><li class="chapter-item expanded "><a href="cli/preface.html"><strong aria-hidden="true">6.</strong> Command line interface</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="cli/cat.html"><strong aria-hidden="true">6.1.</strong> Cat</a></li><li class="chapter-item expanded "><a href="cli/check.html"><strong aria-hidden="true">6.2.</strong> Check</a></li><li class="chapter-item expanded "><a href="cli/config.html"><strong aria-hidden="true">6.3.</strong> Config</a></li><li class="chapter-item expanded "><a href="cli/cp.html"><strong aria-hidden="true">6.4.</strong> Cp</a></li><li class="chapter-item expanded "><a href="cli/cron.html"><strong aria-hidden="true">6.5.</strong> Cron</a></li><li class="chapter-item expanded "><a href="cli/help.html"><strong aria-hidden="true">6.6.</strong> Help</a></li><li class="chapter-item expanded "><a href="cli/hist.html"><strong aria-hidden="true">6.7.</strong> Hist</a></li><li class="chapter-item expanded "><a href="cli/init.html"><strong aria-hidden="true">6.8.</strong> Init</a></li><li class="chapter-item expanded "><a href="cli/login.html"><strong aria-hidden="true">6.9.</strong> Login</a></li><li class="chapter-item expanded "><a href="cli/ls.html"><strong aria-hidden="true">6.10.</strong> Ls</a></li><li class="chapter-item expanded "><a href="cli/monit.html"><strong aria-hidden="true">6.11.</strong> Monit</a></li><li class="chapter-item expanded "><a href="cli/mv.html"><strong aria-hidden="true">6.12.</strong> Mv</a></li><li class="chapter-item expanded "><a href="cli/pull.html"><strong aria-hidden="true">6.13.</strong> Pull</a></li><li class="chapter-item expanded "><a href="cli/push.html"><strong aria-hidden="true">6.14.</strong> Push</a></li><li class="chapter-item expanded "><a href="cli/rm.html"><strong aria-hidden="true">6.15.</strong> Rm</a></li><li class="chapter-item expanded "><a href="cli/run.html"><strong aria-hidden="true">6.16.</strong> Run</a></li><li class="chapter-item expanded "><a href="cli/server.html"><strong aria-hidden="true">6.17.</strong> Server</a></li><li class="chapter-item expanded "><a href="cli/stop.html"><strong aria-hidden="true">6.18.</strong> Stop</a></li><li class="chapter-item expanded "><a href="cli/supervisor.html"><strong aria-hidden="true">6.19.</strong> Supervisor</a></li><li class="chapter-item expanded "><a href="cli/worker.html"><strong aria-hidden="true">6.20.</strong> Worker</a></li></ol></li><li class="chapter-item expanded "><a href="examples/preface.html"><strong aria-hidden="true">7.</strong> Examples</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="examples/dotnet-pipeline.html"><strong aria-hidden="true">7.1.</strong> .NET pipeline</a></li><li class="chapter-item expanded "><a href="examples/nodejs-pipeline.html"><strong aria-hidden="true">7.2.</strong> Nodejs pipeline</a></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using backend.Hubs;
using backend.utils.AuthenticationHandlers;

namespace backend
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddSignalR();

            // services.AddAuthentication()
            //     .AddScheme<ValidateJwtTokenAuthenticationSchemeOptions, ValidateJwtTokenAuthenticationHandler>(ValidateJwtTokenAuthenticationSchemeOptions.name, o => {});

            services.AddAuthentication(options =>
            {
                options.DefaultScheme = ValidateJwtTokenAuthenticationSchemeOptions.name;
            }).AddScheme<ValidateJwtTokenAuthenticationSchemeOptions, ValidateJwtTokenAuthenticationHandler>(ValidateJwtTokenAuthenticationSchemeOptions.name, o => o.DisplayMessage = "Login");
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<ChatHub>("/chat");
            });
        }
    }
}